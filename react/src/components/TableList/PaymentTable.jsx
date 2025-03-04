"use client";

import React, { useState } from "react";
import { Search, FilterList } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import "./DOTable.css";
import { StatusIcon } from "../StatusRender.jsx";

export const PaymentTable = ({ data = [], loading = false, onPaySelected }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map((item) => item.id));
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

  return (
    <div className="active-lists">
      <div
        className="active-lists__header"
        style={{ position: "sticky", top: 0, zIndex: 10, background: "white" }}
      >
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">CONFIRMED JOBS FOR PAYMENT</h2>
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
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    className="checkbox-input"
                  />
                </th>
                <th>Status</th>
                <th>Job ID</th>
                <th>Job Type</th>
                <th>Shipment Type</th>
                <th>Submitted Date</th>
                <th>Amount</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
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
                data.map((row, index) => (
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
            onClick={() => onPaySelected?.(selectedRows)}
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

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>Column :</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "2px 8px",
              }}
            >
              10 <FilterList style={{ fontSize: 16, marginLeft: 4 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
