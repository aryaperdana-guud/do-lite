"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Visibility, FilterList, Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./DOTable.css"; // Reusing the same CSS file
import { StatusIcon } from "../StatusRender.jsx";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { formatDate } from "../Utility/formatDate.jsx";
import { formatCurrency } from "../Utility/formatCurrency.jsx";

export const TransactionTable = ({ apiUrl, loading = false }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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
            status: item.ptxPaymentState || "N/A",
            paymentId: item.ptxId || "Unknown",
            billingDate: formatDate(item.ptxDtCreate),
            amount: formatCurrency(item.ptxAmount),
            currency: item.tmstCurrency.ccyCode,
            paymentDate: formatDate(item.ptxDtCreate),
            paidDate: formatDate(item.ptxDtPaid),
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

    return [...data].sort((a, b) => {
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
          <h2 className="active-lists__title">Transactions</h2>
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
                <th
                  onClick={() => handleSort("status")}
                  style={{ cursor: "pointer" }}
                >
                  Status <SortIcon sortKey="status" />
                </th>
                <th
                  onClick={() => handleSort("paymentId")}
                  style={{ cursor: "pointer" }}
                >
                  Payment ID <SortIcon sortKey="paymentId" />
                </th>
                <th
                  onClick={() => handleSort("billingDate")}
                  style={{ cursor: "pointer" }}
                >
                  Billing Date <SortIcon sortKey="billingDate" />
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  style={{ cursor: "pointer" }}
                >
                  Amount <SortIcon sortKey="amount" />
                </th>
                <th
                  onClick={() => handleSort("currency")}
                  style={{ cursor: "pointer" }}
                >
                  Currency <SortIcon sortKey="currency" />
                </th>
                <th
                  onClick={() => handleSort("paymentDate")}
                  style={{ cursor: "pointer" }}
                >
                  Payment Date <SortIcon sortKey="paymentDate" />
                </th>
                <th
                  onClick={() => handleSort("paidDate")}
                  style={{ cursor: "pointer" }}
                >
                  Paid Date <SortIcon sortKey="paidDate" />
                </th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
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
                sortedData.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <StatusIcon type="payment" status={row.status} />
                    </td>
                    <td>{row.paymentId}</td>
                    <td>{row.billingDate}</td>
                    <td>{row.amount}</td>
                    <td>{row.currency}</td>
                    <td>{row.paymentDate}</td>
                    <td>{row.paidDate || "..."}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-button_DO">
                          <Visibility
                            style={{ fontSize: 16, color: "#1a73e8" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-button_DO">
                          <Download style={{ fontSize: 16 }} />
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
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
};

export default TransactionTable;
