"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  FilterList,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./DOTable.css";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender.jsx";
import { formatDate } from "../Utility/formatDate.jsx";
import { formatCurrency } from "../Utility/formatCurrency.jsx";

export const PaymentTable = ({ apiUrl, onPaySelected }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const navigate = useNavigate();

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
          responseData.aaData?.map((item) => ({
            status: item.jobState || "N/A",
            jobId: item.jobId || "Unknown",
            jobType: item.doJobType || "Unknown",
            shipmentType: item.shipmentType || "N/A",
            submittedDate: formatDate(item.submittedDate),
            amount: formatCurrency(item.totalByJob),
          })) || [];

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
    if (!displayData || !sortConfig.key) return displayData;

    return [...displayData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [displayData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(displayData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedRows.includes(id);

  // Sorting icon component
  const SortIcon = ({ sortKey }) => {
    const isActive = sortConfig.key === sortKey;
    const isAscending = isActive && sortConfig.direction === "ascending";

    return (
      <span
        className="sort-icon-container"
        style={{
          display: "inline-flex",
          marginLeft: "5px",
          alignItems: "center",
        }}
      >
        {isActive ? (
          isAscending ? (
            <ArrowUpward style={{ fontSize: 14, color: "blue" }} />
          ) : (
            <ArrowDownward style={{ fontSize: 14, color: "blue" }} />
          )
        ) : (
          <span
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ArrowUpward style={{ fontSize: 12, color: "gray" }} />
            <ArrowDownward style={{ fontSize: 12, color: "gray" }} />
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="active-lists">
      <div
        className="active-lists__header"
        style={{ position: "sticky", top: 0, zIndex: 10, background: "white" }}
      >
        <div className="active-lists__title-section">
          <h2
            style={{
              color: "#263754",
              marginBottom: "20px",
              marginTop: "none",
            }}
          >
            Confirmed Jobs for Payments
          </h2>
          <IconButton size="small">
            <FilterList />
          </IconButton>
        </div>
      </div>

      <div
        className="active-lists__content"
        style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}
      >
        {loadingData ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <table className="active-lists__table">
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                zIndex: 5,
              }}
            >
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      displayData.length > 0 &&
                      selectedRows.length === displayData.length
                    }
                    className="checkbox-input"
                  />
                </th>
                <th
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Status <SortIcon sortKey="status" />
                </th>
                <th
                  onClick={() => handleSort("jobId")}
                  style={{ cursor: "pointer" }}
                >
                  Job ID <SortIcon sortKey="jobId" />
                </th>
                <th
                  onClick={() => handleSort("jobType")}
                  style={{ cursor: "pointer" }}
                >
                  Job Type <SortIcon sortKey="jobType" />
                </th>
                <th
                  onClick={() => handleSort("shipmentType")}
                  style={{ cursor: "pointer" }}
                >
                  Shipment Type <SortIcon sortKey="shipmentType" />
                </th>
                <th
                  onClick={() => handleSort("submittedDate")}
                  style={{ cursor: "pointer" }}
                >
                  Submitted Date <SortIcon sortKey="submittedDate" />
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  style={{ cursor: "pointer" }}
                >
                  Amount <SortIcon sortKey="amount" />
                </th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
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
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="checkbox-input"
                      />
                    </td>
                    <td>
                      <StatusIcon type="payment" status={row.status} />
                    </td>
                    <td>{row.jobId}</td>
                    <td>{row.jobType}</td>
                    <td>{row.shipmentType}</td>
                    <td>{row.submittedDate}</td>
                    <td>{row.amount}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-button_DO">
                          <Search style={{ fontSize: 16 }} />
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

      <div
        className="active-lists__footer"
        style={{
          position: "sticky",
          bottom: 0,
          background: "white",
          zIndex: 10,
          padding: "10px 0",
          borderTop: "1px solid #eee",
        }}
      >
        <div
          className="active-lists__controls"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="pay-button"
            onClick={() => navigate("/do-payment/payment/pay")}
            disabled={selectedRows.length === 0}
            style={{
              backgroundColor: "#1a3a54",
              width: "200px",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
              opacity: selectedRows.length === 0 ? 0.7 : 1,
            }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
