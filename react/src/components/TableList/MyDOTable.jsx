"use client";
import React, { useState, useMemo } from "react";
import { Eye, ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";
import "./BOLTable.css";
import { useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MyDOTable = ({ apiUrl, title }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
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
            //data for details
            id: item.doId,
            // do number
            // bl number, type, document
            //consignee, notify party
            // vessel name, ETA
            // voyage number
            //

            //
            doNumber: item.doNo || "N/A",
            consignee: item.tcoreAccnByDoCoAccn?.accnName || "Unknown",
            vesselName: item.doVesselName || "Unknown",
            voyageNumber: item.doVoyageNo || "N/A",
            blNumber: item.doBlNo || "N/A",
            blType: item.doBlType || "N/A",
            numberOfContainers: item.doNoCnt || 0,
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

  // Custom sorting handler
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
  const CustomSortIcon = ({ active, direction }) => {
    if (!active) {
      return <ChevronsUpDown size={16} className="text-gray-400" />;
    }

    return direction === "asc" ? (
      <ArrowUp size={16} className="text-blue-600" />
    ) : (
      <ArrowDown size={16} className="text-blue-600" />
    );
  };

  // Table headers with sorting
  const headers = [
    { key: "doNumber", label: "DO Number" },
    { key: "consignee", label: "Consignee (Cargo Owner)" },
    { key: "vesselName", label: "Vessel Name" },
    { key: "voyageNumber", label: "Voyage Number" },
    { key: "blNumber", label: "BL Number" },
    { key: "blType", label: "BL Type" },
    { key: "numberOfContainers", label: "Number of Containers" },
    { label: "Action", disableSort: true },
  ];

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <Typography variant="h5" className="header-title">
          {title}
        </Typography>
      </div>

      <div
        className="active-lists__content"
        style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
      >
        {loadingData ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      key={header.label}
                      className="table-header"
                      sortDirection={
                        sortConfig.key === header.key
                          ? sortConfig.direction
                          : false
                      }
                    >
                      {header.disableSort ? (
                        header.label
                      ) : (
                        <div
                          onClick={() => handleSort(header.key)}
                          className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
                          {header.label}
                          <CustomSortIcon
                            active={sortConfig.key === header.key}
                            direction={sortConfig.direction}
                          />
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Sorry, no matching records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedData.map((row, index) => (
                    <TableRow key={row.doNumber} className="table-row">
                      <TableCell>{row.doNumber}</TableCell>
                      <TableCell>{row.consignee}</TableCell>
                      <TableCell>{row.vesselName}</TableCell>
                      <TableCell>{row.voyageNumber}</TableCell>
                      <TableCell>{row.blNumber}</TableCell>
                      <TableCell>{row.blType}</TableCell>
                      <TableCell>{row.numberOfContainers}</TableCell>
                      <TableCell>
                        <div className="action-buttons">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate("/my-do/active/details")}
                            sx={{ color: "#3b82f6" }}
                          >
                            <Eye size={16} />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default MyDOTable;
