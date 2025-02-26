import React from "react";
import { useState } from "react";
import {
  Eye,
  Edit,
  Trash,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./DOTable.css";
import { StatusIcon } from "../StatusRender.jsx"; // Make sure path is correct
import { useNavigate } from "react-router-dom";

// Keeping the mock data for development

export const DataTable = ({
  title,
  data,
  loading = false,
  onDownload,
  onViewItem,
  onEditItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedData =
    data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ||
    [];

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">{title}</h2>
          <button className="active-lists__download" onClick={onDownload}>
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="active-lists__content">
        {loading ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <table className="active-lists__table">
            <thead>
              <tr>
                <th>Payment</th>
                <th>Document</th>
                <th>Surrender</th>
                <th>Job ID</th>
                <th>Shipment Type</th>
                <th>Shipping Line</th>
                <th>Date Submitted</th>
                <th>No of BL</th>
                <th>Action</th>
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
                paginatedData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>
                      <StatusIcon type="payment" status={row.payment} />
                    </td>
                    <td>
                      <StatusIcon type="document" status={row.document} />
                    </td>
                    <td>
                      <StatusIcon type="surrender" status={row.surrender} />
                    </td>
                    <td>{row.jobId}</td>
                    <td>{row.shipmentType}</td>
                    <td>{row.shippingLine}</td>
                    <td>{row.dateSubmitted}</td>
                    <td>{row.noOfBl}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button"
                          onClick={() => navigate(`/edit-do-claim/${row.id}`)}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="action-button"
                          onClick={() => onViewItem?.(row)}
                        >
                          <Eye size={16} />
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
          <div className="active-lists__items-per-page">
            <label htmlFor="itemsPerPage">Show:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
