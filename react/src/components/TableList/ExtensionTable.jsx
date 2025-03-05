"use client";

import React, { useState, useMemo } from "react";
import {
  Eye,
  Pencil,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender";
import "./BOLTable.css";

export const ExtensionTable = ({
  title,
  data = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onViewDO,
  onViewContainers,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const navigate = useNavigate();

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil((sortedData?.length || 0) / itemsPerPage);

  // Sort handler
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setCurrentPage(1);
  };

  // Custom sort icon component
  const SortIcon = ({ active, direction }) => {
    if (!active) {
      return <ChevronsUpDown size={16} className="text-gray-400" />;
    }

    return direction === "asc" ? (
      <ArrowUp size={16} className="text-blue-600" />
    ) : (
      <ArrowDown size={16} className="text-blue-600" />
    );
  };

  // Pagination handlers
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Paginate sorted data
  const paginatedData =
    sortedData?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  // Define sortable headers
  const headers = [
    { key: "status", label: "Status" },
    { key: "jobNo", label: "Job No" },
    { key: "blNo", label: "BL No" },
    { key: "originalDoNo", label: "Original DO No" },
    { key: "noOfContainers", label: "No of Containers" },
    { key: "extendedValidDate", label: "Extended Valid Date" },
    { key: "amount", label: "Amount (IDR)" },
    { key: "paymentDate", label: "Payment Date" },
    { label: "Action", disableSort: true },
  ];

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">{title}</h2>
          <div className="active-lists__actions">
            <button
              className="active-lists__download"
              onClick={onDownload}
              title="Download Lists"
            >
              <Download size={30} />
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
                {headers.map((header) => (
                  <th
                    key={header.label}
                    onClick={() =>
                      !header.disableSort && handleSort(header.key)
                    }
                    className={!header.disableSort ? "sortable-header" : ""}
                  >
                    <div className="flex items-center gap-2">
                      {header.label}
                      {!header.disableSort && (
                        <SortIcon
                          active={sortConfig.key === header.key}
                          direction={sortConfig.direction}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
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
                paginatedData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <StatusIcon status={row.status} />
                    </td>
                    <td>{row.jobNo}</td>
                    <td>{row.blNo}</td>
                    <td>
                      <div className="inline-content">
                        <span>{row.originalDoNo}</span>
                        <button
                          className="action-button inline-button"
                          onClick={() => onViewDO?.(row)}
                          title="View DO Details"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="inline-content">
                        <span>{row.noOfContainers}</span>
                        <button
                          className="action-button inline-button"
                          onClick={() => onViewContainers?.(row)}
                          title="View Container Details"
                        >
                          <Search size={16} />
                        </button>
                      </div>
                    </td>
                    <td>{row.extendedValidDate}</td>
                    <td>{row.amount}</td>
                    <td>{row.paymentDate}</td>
                    <td>
                      <div className="action-buttons">
                        {title === "History List" ? (
                          <>
                            <span></span>
                            <button
                              className="action-button-extension"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <span></span>
                          </>
                        ) : (
                          <>
                            <button
                              className="action-button-extension"
                              onClick={() =>
                                navigate(
                                  `/edit-do-extension/GenDetails/${row.id}`
                                )
                              }
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              className="action-button-extension"
                              onClick={() => onView?.(row)}
                              title="View"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              className="action-button-extension"
                              onClick={() => onDelete?.(row)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
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

export default ExtensionTable;
