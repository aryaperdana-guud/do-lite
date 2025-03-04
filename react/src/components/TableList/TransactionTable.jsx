"use client";

import React, { useState } from "react";
import { Visibility, FilterList, Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./DOTable.css"; // Reusing the same CSS file
import { StatusIcon } from "../StatusRender.jsx";

export const TransactionTable = ({ data = [], loading = false }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedRows.includes(id);

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
        {loading ? (
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
                <th>Status</th>
                <th>Payment ID</th>
                <th>Billing Date</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Payment Date</th>
                <th>Paid Date</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
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
                data.map((row, index) => (
                  <tr
                    key={row.id}
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
