"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender"; // Make sure path is correct
import "./BOLTable.css"; // Import the existing CSS file

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
  const temp = title;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
                <th>Status</th>
                <th>Job No</th>
                <th>BL No</th>
                <th>Original DO No</th>
                <th>No of Containers</th>
                <th>Extended Valid Date</th>
                <th>Amount (IDR)</th>
                <th>Payment Date</th>
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
                        {temp === "History List" ? (
                          <>
                            <span className="action-button placeholder"></span>
                            <button
                              className="action-button-extension"
                              onClick={() => onView?.(row)}
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <span className="action-button placeholder"></span>
                          </>
                        ) : (
                          <>
                            <button
                              className="action-button-extension"
                              onClick={() => onEdit?.(row)}
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
