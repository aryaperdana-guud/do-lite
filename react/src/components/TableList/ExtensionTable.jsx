"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../StatusRender";
import "./BOLTable.css";
import { formatDate } from "../Utility/formatDate";
import { formatCurrency } from "../Utility/formatCurrency";
import { 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Typography,
 } from "@mui/material";

export const ExtensionTable = ({
  title,
  data = [],
  loading = false,
  onView,
  onEdit,
  apiUrl,
  onDelete,
  onDownload,
  onViewDO,
  onViewContainers,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");

  const [isOpen, setIsOpen] = useState(false); //untuk open pop up container details

  const isHistoryPage = title === "History List";

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
            //id For extend
            idExtend: item.doxId || "N/A",
            //
            status: item.tckMstDoState.dostId || "N/A",
            jobNo: item.tckJobDoExt.tckJob.jobId || "N/A",
            blNo: item.tckDo.doBlNo || "Unknown",
            originalDoNo: item.tckDo.doNo || "N/A",
            noOfContainers: item.doxNoCnt || "N/A",
            extendedValidDate: formatDate(item.doxValidDate),
            amount: formatCurrency(item.doxChargesTotal),
            paymentDate: formatDate(
              item.tckJobDoExt.tckJob.tckRecordDate.rcdDtPaid
            ),
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
  }, [token, apiUrl]);

  const displayData = tableData;

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return displayData;

    return [...displayData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [displayData, sortConfig]);

  // Sort handler
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
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
          <div className="active-lists__actions"></div>
        </div>
      </div>

      <div className="active-lists__content">
        {loadingData ? (
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
              {displayData.length === 0 ? (
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
                  <TableRow key={row.jobNo}>
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
                          onClick={() => navigate(`/do-claim/detail/${row.jobId}`)}
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
                          onClick={() => setIsOpen(true)}
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
                              onClick={() =>
                                navigate(
                                  `/view-do-extension/GenDetails/${row.idExtend}/${title}`
                                )
                              }
                              title="View"
                            >
                              <Eye size={16} color="#0070c0" />
                            </button>
                            <span></span>
                          </>
                        ) : (
                          <>
                            <button
                              className="action-button-extension"
                              onClick={() =>
                                navigate(
                                  `/view-do-extension/GenDetails/${row.idExtend}/${title}`
                                )
                              }
                              title="View"
                            >
                              <Edit size={16} color="#0070c0" />
                            </button>

                            <button
                              className="action-button-extension"
                              onClick={() => onDelete?.(row)}
                              title="Delete"
                            >
                              <Trash2 size={16} color="red" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </TableRow>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#263754", color: "white", textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "white !important" }}>
            View Container
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ margin: "20px", padding: "0"}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid #ccc", bgcolor: "#eaeaea", fontWeight: "bold" }}>Container No</TableCell>
                    <TableCell sx={{ border: "1px solid #ccc", bgcolor: "#eaeaea", fontWeight: "bold" }}>Container Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell sx={{
                          border: "1px solid #ccc",
                          borderRadius: "8px", 
                          padding: "8px", 
                        }}>abc</TableCell>
                      <TableCell sx={{
                          border: "1px solid #ccc",
                          borderRadius: "8px", 
                          padding: "8px", 
                      }}
                      ></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </DialogContent>
      </Dialog>

      <div className="active-lists__footer">
        <div className="active-lists__controls"></div>
      </div>
    </div>
  );
};

export default ExtensionTable;
