import React, { useMemo, useEffect, useState } from "react";
import { Eye, Edit, Download, ArrowUp, ArrowDown } from "lucide-react";
import "./DOTable.css";
import { StatusIcon } from "../StatusRender.jsx";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utility/formatDate.jsx";

export const DOTable = ({ title, data, onDownload, onViewItem, apiUrl }) => {
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
            payment: item.tckJob.tckMstJobState.jbstId || "N/A",
            document: item.jobStateDocVerfiy || "N/A",
            surrender: item.jobStateDocVerfiy,
            jobId: item.jobId || "N/A",
            shipmentType: item.tckJob.tckMstShipmentType.shtId || "N/A",
            shippingLine: item.tckJob.tcoreAccnByJobSlAccn.accnId || "N/A",
            dateSubmitted:
              formatDate(item.tckJob.tckRecordDate.rcdDtSubmit) || "N/A",
            noOfBl: item.jobNoDo || "0",
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
    if (!displayData || !sortConfig.key) return displayData || [];

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
        {loadingData ? (
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
                      <StatusIcon type="payment" status={row.payment} />
                    </td>
                    <td>
                      <StatusIcon type="document" status={row.document} />
                    </td>
                    <td>
                      <StatusIcon
                        type="surrender"
                        status={
                          row.document === "Pending Return"
                            ? "PENDING_RETURN"
                            : "SURRENDERED"
                        }
                      />
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
    </div>
  );
};

export default DOTable;
