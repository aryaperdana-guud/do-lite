"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Download, File, Eye, Trash2 } from "lucide-react";
import "./BOLTable.css";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender.jsx";
import { Badge, TableRow } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { formatDate } from "../Utility/formatDate.jsx";

export const BOLTable = ({
  title,
  onDownload,
  onDownloadItem,
  apiUrl,
  onDeleteItem,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    async function fetchTableData() {
      setLoadingData(true);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        const formattedData =
          responseData.aaData?.map((item) => {
            let status = item.tckMstBlState.blstId || "N/A";
            if (status === "NEW") {
              status = "ONGOING_VERIF";
            }
            return {
              status,
              cargoOwner: item.tcoreAccnByBlCoAccn.accnNameOth || "Unknown",
              id: item.blBlNo,
              blNo: item.blBlNo || "N/A",
              containerNo: item.blCntNo || "N/A",
              shippingLine: item.tcoreAccnByBlSlAccn.accnId || "N/A",
              submittedDate: formatDate(item.blDtSubmitted) || "N/A",
              submittedBy: item.tcoreAccnByBlOwnerAccn.accnName || "N/A",
              assignedJobNo: item.blAssignedJobNo || "N/A",
              assignedDate: formatDate(item.blDtAssigned) || "N/A",
            };
          }) || [];

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTableData([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchTableData();
    }
  }, [token]);

  const displayData = tableData;

  // Sorting function
  const sortedData = useMemo(() => {
    if (!displayData || displayData.length === 0) return [];

    return [...displayData].sort((a, b) => {
      if (!sortConfig.key) return displayData;

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
  }, [displayData, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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
      setSelectedItems(sortedData.map((item) => item.id));
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
        {loadingData ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <div className="table-wrapper">
            <table className="active-lists__table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          sortedData.length > 0 &&
                          selectedItems.length === sortedData.length
                        }
                        className="checkbox-input"
                      />
                    </div>
                  </th>
                  <SortableHeader label="Status" sortKey="status" />
                  <SortableHeader label="BL No." sortKey="blNo" />
                  <SortableHeader label="Container No." sortKey="containerNo" />
                  <SortableHeader
                    label="Shipping Line"
                    sortKey="shippingLine"
                  />
                  <SortableHeader
                    label="Submitted Date"
                    sortKey="submittedDate"
                  />
                  <SortableHeader label="Submitted By" sortKey="submittedBy" />
                  <SortableHeader
                    label="Assigned Job No."
                    sortKey="assignedJobNo"
                  />
                  <SortableHeader
                    label="Assigned Date"
                    sortKey="assignedDate"
                  />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.length === 0 ? (
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
                  sortedData.map((row, index) => (
                    <TableRow
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
                            <Eye size={16} />
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
                    </TableRow>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BOLTable;
