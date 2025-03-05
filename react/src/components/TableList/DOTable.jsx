import React, { useState, useMemo } from "react";
import {
  Eye,
  Edit,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import "./DOTable.css";
import { StatusIcon } from "../StatusRender.jsx";
import { useNavigate } from "react-router-dom";

export const DataTable = ({
  title,
  data,
  loading = false,
  onDownload,
  onViewItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();

  // Sorting function
  const sortedData = useMemo(() => {
    if (!data || !sortConfig.key) return data || [];

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil((sortedData?.length || 0) / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
    setCurrentPage(1);
  };

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

  // Sorting icon component
  const SortIcon = ({ sortKey }) => {
    const isActive = sortConfig.key === sortKey;
    const isAscending = isActive && sortConfig.direction === "ascending";

    return (
      <span className="sort-icon-container">
        <ArrowUp
          size={12}
          color={isActive && isAscending ? "blue" : "gray"}
          className={`sort-icon ${isActive && isAscending ? "active" : ""}`}
        />
        <ArrowDown
          size={12}
          color={isActive && !isAscending ? "blue" : "gray"}
          className={`sort-icon ${isActive && !isAscending ? "active" : ""}`}
        />
      </span>
    );
  };

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
                <th onClick={() => handleSort("payment")}>
                  Payment <SortIcon sortKey="payment" />
                </th>
                <th onClick={() => handleSort("document")}>
                  Document <SortIcon sortKey="document" />
                </th>
                <th onClick={() => handleSort("surrender")}>
                  Surrender <SortIcon sortKey="surrender" />
                </th>
                <th onClick={() => handleSort("jobId")}>
                  Job ID <SortIcon sortKey="jobId" />
                </th>
                <th onClick={() => handleSort("shipmentType")}>
                  Shipment Type <SortIcon sortKey="shipmentType" />
                </th>
                <th onClick={() => handleSort("shippingLine")}>
                  Shipping Line <SortIcon sortKey="shippingLine" />
                </th>
                <th onClick={() => handleSort("dateSubmitted")}>
                  Date Submitted <SortIcon sortKey="dateSubmitted" />
                </th>
                <th onClick={() => handleSort("noOfBl")}>
                  No of BL <SortIcon sortKey="noOfBl" />
                </th>
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
                          className="action-button_DO"
                          onClick={() => navigate(`/edit-do-claim/${row.id}`)}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="action-button_DO"
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
