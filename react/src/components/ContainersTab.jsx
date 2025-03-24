"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { formatDate } from "./Utility/formatDate";
import { useParams } from "react-router-dom";

export function ContainersTab() {
  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [containers, setContainers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/doCnt/${id}/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=tckDo.doDtCreate&mDataProp_1=listOfContainerForExtension&sSearch_1=true&iColumns=2`;

  useEffect(() => {
    async function fetchContainers() {
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
            id: item.tckCnt.cntNo || "-",
            marksNumber: item.tckCnt.cntNo || "-",
            packages: item.tckCnt.cntNoPackages || "-",
            description:
              item.tckCnt.cntDescription || "No Description Available",
            measurements: item.tckCnt.cntWeight || "-",
            validateTill: formatDate(item.tckCnt.cntValidDate),
          })) || [];

        setContainers(formattedData);
        console.log("Full formattedData:", formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setContainers([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchContainers();
    }
  }, [token]);

  // Sorting function
  const sortContainers = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedContainers = [...containers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setContainers(sortedContainers);
    setSortConfig({ key, direction });
  };

  // Mapping between display headers and object keys
  const headerMapping = {
    "Marks and Number": "marksNumber",
    "Number of Packages": "packages",
    Description: "description",
    "Weight and Measurements": "measurements",
    "Validate Till Date": "validateTill",
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "50vh", // Limit the maximum height
      }}
    >
      {/* Header - Fixed Position */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          position: "relative", // Changed from sticky
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          pb: 2,
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#263754",
          }}
        >
          Containers
        </Typography>
      </Box>

      {/* Table Container with fixed height and scrollable content */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "none",
          borderRadius: "8px",
          flex: 1,
          overflow: "auto",
          height: "calc(100% - 120px)", // Adjust based on header and footer height
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(headerMapping).map((header) => (
                <TableCell
                  key={header}
                  style={{
                    color: "#455571",
                    fontWeight: 700,
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => sortContainers(headerMapping[header])}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {header}
                    {sortConfig.key === headerMapping[header] &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {containers.map((container) => (
              <TableRow
                key={container.id}
                hover
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <TableCell>{container.marksNumber}</TableCell>
                <TableCell>{container.packages}</TableCell>
                <TableCell>{container.description}</TableCell>
                <TableCell>{container.measurements}</TableCell>
                <TableCell>{container.validateTill}</TableCell>
              </TableRow>
            ))}
            {containers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  style={{ padding: "20px" }}
                >
                  No containers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer - Fixed Position */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          position: "relative", // Changed from sticky
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Typography style={{ color: "#455571" }}>
          Total Containers: {containers.length} records
        </Typography>

        <IconButton
          size="small"
          style={{
            backgroundColor: "#263754",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <FileDownloadIcon />
        </IconButton>
      </Box>
    </div>
  );
}
