"use client";
import React, { useState } from "react";
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

// Generate a large sample dataset for containers
const generateContainers = (count) => {
  const containerTypes = ["20HC", "40HC", "45HC", "20FR", "40FR"];
  const containers = [];

  for (let i = 1; i <= count; i++) {
    const containerType =
      containerTypes[Math.floor(Math.random() * containerTypes.length)];
    const containerNumber = `MSGU${Math.floor(1000000 + Math.random() * 9000000)}`;

    containers.push({
      id: i,
      marksNumber: `${containerNumber} / ${containerType}`,
      packages: Math.floor(50 + Math.random() * 100).toString(),
      description:
        i % 5 === 0
          ? "Electronics"
          : i % 4 === 0
            ? "Textiles"
            : i % 3 === 0
              ? "Machinery"
              : "-",
      measurements: Math.floor(10000 + Math.random() * 30000).toString(),
      validateTill: `${(i % 28) + 1}/0${(i % 12) + 1}/2024`,
    });
  }

  return containers;
};

export function ContainersTab() {
  // Sample data with 50 items
  const [containers, setContainers] = useState(generateContainers(50));

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

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
        maxHeight: "55vh", // Limit the maximum height
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
