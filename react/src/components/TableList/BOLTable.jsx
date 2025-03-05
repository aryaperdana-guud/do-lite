"use client";
import React, { useState, useMemo } from "react";
import {
  Download,
  File,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";
import "./BOLTable.css";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender.jsx";
import { Badge, IconButton, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

export const BOLTable = ({
  title,
  data,
  loading = false,
  onDownload,
  onDownloadItem,
  onViewItem,
  onDeleteItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);

  // Sorting function
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      if (!sortConfig.key) return 0;

      const key = sortConfig.key;
      const aValue = a[key];
      const bValue = b[key];

      // Handle different types of sorting
      if (typeof aValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic with sorted data
  const totalPages = Math.ceil((sortedData?.length || 0) / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleClaimClick = () => {
    if (selectedItems.length < 1) {
      setOpenAlert(true);
    } else {
      navigate(`/bol/active/claim`);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(paginatedData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Sorting header with indicator
  const SortableHeader = ({ label, sortKey }) => (
    <th
      onClick={() => handleSort(sortKey)}
      style={{
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
      }}
    >
      {label}
      {sortConfig.key === sortKey && (
        <span
          style={{
            marginLeft: "5px",
            fontSize: "0.7em",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {sortConfig.direction === "asc" ? "▲" : "▼"}
        </span>
      )}
    </th>
  );

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">{title}</h2>
          <div className="active-lists__actions">
            <button
              className="active-lists__download"
              onClick={handleClaimClick}
              title="Selected"
            >
              <Badge
                badgeContent={selectedItems.length}
                color="primary"
                overlap="circular"
              >
                <File size={25} />
              </Badge>
            </button>
            <Snackbar
              open={openAlert}
              autoHideDuration={2000}
              onClose={() => setOpenAlert(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setOpenAlert(false)}
                severity="warning"
                sx={{ width: "100%" }}
              >
                Please select at least one item before claiming!
              </Alert>
            </Snackbar>

            <button
              className="active-lists__download"
              onClick={onDownload}
              title="Download Lists"
            >
              <Download size={25} />
            </button>
          </div>
        </div>
      </div>

      <div className="active-lists__content">
        {loading ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <table className="active-lists__table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        paginatedData.length > 0 &&
                        selectedItems.length === paginatedData.length
                      }
                      className="checkbox-input"
                    />
                  </div>
                </th>
                <SortableHeader label="Status" sortKey="status" />
                <SortableHeader label="BL No." sortKey="blNo" />
                <SortableHeader label="Container No." sortKey="containerNo" />
                <SortableHeader label="Shipping Line" sortKey="shippingLine" />
                <SortableHeader
                  label="Submitted Date"
                  sortKey="submittedDate"
                />
                <SortableHeader label="Submitted By" sortKey="submittedBy" />
                <SortableHeader
                  label="Assigned Job No."
                  sortKey="assignedJobNo"
                />
                <SortableHeader label="Assigned Date" sortKey="assignedDate" />
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#888",
                    }}
                  >
                    Sorry, no matching records found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td className="checkbox-column">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(row.id)}
                          onChange={() => handleSelectItem(row.id)}
                          className="checkbox-input"
                        />
                      </div>
                    </td>
                    <td>
                      <StatusIcon status={row.status} />
                    </td>
                    <td>{row.blNo}</td>
                    <td>{row.containerNo}</td>
                    <td>{row.shippingLine}</td>
                    <td>{row.submittedDate}</td>
                    <td>{row.submittedBy}</td>
                    <td>{row.assignedJobNo}</td>
                    <td>{row.assignedDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button_BOL"
                          onClick={() =>
                            navigate(`/bol/active/view/${row.id}`, {
                              state: row,
                            })
                          }
                          title="View"
                        >
                          <Eye size={16} sx={{ color: "#3b82f6" }} />
                        </button>

                        <button
                          className="action-button_BOL"
                          onClick={() => onDownloadItem?.(row)}
                          title="Download"
                        >
                          <Download size={16} />
                        </button>

                        <button
                          className="action-button_BOL"
                          onClick={() => onDeleteItem?.(row)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="active-lists__footer">
        <div className="active-lists__controls">
          <div className="active-lists__column-select">
            <span>Column:</span>
            <select
              className="row-number"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="active-lists__pagination">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOLTable;
