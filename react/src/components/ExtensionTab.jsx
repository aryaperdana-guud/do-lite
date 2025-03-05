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
import { StatusIcon } from "./StatusRender";

// Generate a large sample dataset for extensions
const generateExtensions = (count) => {
  const containerTypes = ["20HC", "40HC", "45HC", "20FR", "40FR"];
  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];
  const statuses = ["accepted", "pending", "rejected"];
  const extensions = [];

  for (let i = 1; i <= count; i++) {
    const containerType =
      containerTypes[Math.floor(Math.random() * containerTypes.length)];
    const containerNumber = `MSGU${Math.floor(1000000 + Math.random() * 9000000)}`;
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = (50 + Math.random() * 500).toFixed(2);

    extensions.push({
      id: i,
      validTillDate: `${(i % 28) + 1}/0${(i % 12) + 1}/2024`,
      noContainers: `${containerNumber} / ${containerType}`,
      currency: currency,
      amount: parseFloat(amount),
      submitDate: `${(i % 28) + 1}/0${(i % 12) + 1}/2024`,
      issueDate: `${(i % 28) + 1}/0${(i % 12) + 1}/2024`,
      extendedDO: statuses[Math.floor(Math.random() * statuses.length)],
      proformaInvoice: statuses[Math.floor(Math.random() * statuses.length)],
      platformFeeInvoice: statuses[Math.floor(Math.random() * statuses.length)],
      demurrageFinalInvoice:
        statuses[Math.floor(Math.random() * statuses.length)],
      adminFeeFinalInvoice:
        statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return extensions;
};

export function ExtensionsTab() {
  // Sample data with 50 items
  const [extensions, setExtensions] = useState(generateExtensions(50));

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Sorting function with custom comparators
  const sortExtensions = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedExtensions = [...extensions].sort((a, b) => {
      // Special handling for status columns
      const statusOrder = { pending: 0, rejected: 1, accepted: 2 };

      if (key.includes("Invoice") || key === "extendedDO") {
        const statusA = statusOrder[a[key]] || 0;
        const statusB = statusOrder[b[key]] || 0;
        return direction === "asc" ? statusA - statusB : statusB - statusA;
      }

      // Default sorting for other columns
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setExtensions(sortedExtensions);
    setSortConfig({ key, direction });
  };

  // Mapping between display headers and object keys
  const headerMapping = {
    "Valid Till Date": "validTillDate",
    "No Containers": "noContainers",
    Currency: "currency",
    Amount: "amount",
    "Submit Date": "submitDate",
    "Issue Date": "issueDate",
    "Extended DO": "extendedDO",
    "Proforma Invoice": "proformaInvoice",
    "Platform Fee Invoice": "platformFeeInvoice",
    "Demurrage Final Invoice": "demurrageFinalInvoice",
    "Admin Fee Final Invoice": "adminFeeFinalInvoice",
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
      {/* Header - Relative Position */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          position: "relative",
          zIndex: 2,
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
          Extensions
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
        <Table stickyHeader size="small">
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
                    padding: "8px",
                    whiteSpace: "nowrap",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    cursor:
                      header.includes("Invoice") || header === "Extended DO"
                        ? "default"
                        : "pointer",
                  }}
                  onClick={() => {
                    // Prevent sorting for status columns
                    if (
                      !header.includes("Invoice") &&
                      header !== "Extended DO"
                    ) {
                      sortExtensions(headerMapping[header]);
                    }
                  }}
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
                      !header.includes("Invoice") &&
                      header !== "Extended DO" &&
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
            {extensions.map((extension) => (
              <TableRow
                key={extension.id}
                hover
                style={{
                  backgroundColor: "white",
                }}
                sx={{
                  height: 40, // Numeric value for height
                  "& > td": {
                    padding: "15px", // Adjust cell padding
                  },
                }}
              >
                <TableCell>{extension.validTillDate}</TableCell>
                <TableCell>{extension.noContainers}</TableCell>
                <TableCell>{extension.currency}</TableCell>
                <TableCell>{extension.amount.toFixed(2)}</TableCell>
                <TableCell>{extension.submitDate}</TableCell>
                <TableCell>{extension.issueDate}</TableCell>
                <TableCell>
                  <StatusIcon status={extension.extendedDO} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.proformaInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.platformFeeInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.demurrageFinalInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.adminFeeFinalInvoice} />
                </TableCell>
              </TableRow>
            ))}
            {extensions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={11}
                  align="center"
                  style={{ padding: "20px" }}
                >
                  Sorry, no matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer - Relative Position */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          position: "relative",
          zIndex: 2,
          backgroundColor: "#f5f5f5",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Typography style={{ color: "#455571" }}>
          Total Extensions: {extensions.length} records
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
