"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { StatusIcon } from "./StatusRender";

// Generate a large sample dataset for active tax invoices
const generateActiveTaxInvoices = (count) => {
  const invoices = [
    {
      id: 1,
      status: "accepted",
      invoiceNo: "PLF24122314340814",
      invoiceIssueDate: "24/12/2024 00:20:00",
      taxNumber: "111.007.23.00000118",
      customer: "Combi Logistics",
    },
  ];
  return invoices;
};

// Generate a large sample dataset for history tax invoices
const generateHistoryTaxInvoices = (count) => {
  const invoices = [];
  for (let i = 1; i <= count; i++) {
    invoices.push({
      id: i + 1000,
      status: i % 5 === 0 ? "rejected" : i % 3 === 0 ? "pending" : "accepted",
      invoiceNo: `PLF23${i.toString().padStart(12, "0")}`,
      invoiceIssueDate: `${(i % 30) + 1}/${(i % 12) + 1}/2023 ${Math.floor(i % 24)}:${Math.floor(i % 60)}:00`,
      taxNumber: `111.007.22.${i.toString().padStart(8, "0")}`,
      customer:
        i % 4 === 0
          ? "Combi Logistics"
          : i % 4 === 1
            ? "Global Transport Co."
            : i % 4 === 2
              ? "FastTrack Logistics"
              : "Express Shipping Inc.",
    });
  }
  return invoices;
};

// Sample data with 50 items each
const initialActiveTaxInvoices = generateActiveTaxInvoices(50);
const initialHistoryTaxInvoices = generateHistoryTaxInvoices(50);

export function TaxInvoiceTab() {
  const [isActive, setIsActive] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Get the appropriate data based on the active/history toggle
  const currentInvoices = isActive
    ? initialActiveTaxInvoices
    : initialHistoryTaxInvoices;

  const handleToggleChange = (event) => {
    setIsActive(event.target.checked);
    // Reset sorting when switching between active and history
    setSortConfig({ key: null, direction: "ascending" });
  };

  // Sorting function
  const sortedInvoices = useMemo(() => {
    if (!sortConfig.key) return currentInvoices;

    return [...currentInvoices].sort((a, b) => {
      // Special handling for status sorting (alphabetical)
      if (sortConfig.key === "status") {
        const comparison = a.status.localeCompare(b.status);
        return sortConfig.direction === "ascending" ? comparison : -comparison;
      }

      // Default sorting for other fields
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [currentInvoices, sortConfig]);

  // Handle sorting for a column
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  // Render sort icon based on current sort configuration
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  // Sortable header component
  const SortableHeader = ({ children, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      style={{
        color: "#455571",
        fontWeight: 500,
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 1,
        cursor: sortKey ? "pointer" : "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {children}
        {renderSortIcon(sortKey)}
      </div>
    </TableCell>
  );

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
        maxHeight: "55vh",
      }}
    >
      {/* Header - Sticky */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          position: "sticky",
          top: 0,
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
          Tax Invoices
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={handleToggleChange}
              color="primary"
            />
          }
          label={isActive ? "Active" : "History"}
          labelPlacement="start"
          sx={{
            margin: 0,
            "& .MuiFormControlLabel-label": {
              color: "#455571",
              fontWeight: 500,
            },
          }}
        />
      </Box>

      {/* Table Container with fixed height and scrollable content */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "none",
          borderRadius: "8px",
          fontWeight: "700",
          flex: 1,
          overflow: "auto",
          height: "calc(100% - 120px)", // Adjust based on header and footer height
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <SortableHeader sortKey="status">Status</SortableHeader>
              <SortableHeader sortKey="invoiceNo">Invoice No</SortableHeader>
              <SortableHeader sortKey="invoiceIssueDate">
                Invoice Issue Date
              </SortableHeader>
              <SortableHeader sortKey="taxNumber">Tax Number</SortableHeader>
              <SortableHeader sortKey="customer">Customer</SortableHeader>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 700,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedInvoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                hover
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <TableCell>
                  <StatusIcon status={invoice.status} />
                </TableCell>
                <TableCell>{invoice.invoiceNo}</TableCell>
                <TableCell>{invoice.invoiceIssueDate}</TableCell>
                <TableCell>{invoice.taxNumber}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <FileDownloadIcon style={{ color: "#0070c0" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedInvoices.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ padding: "20px" }}
                >
                  No tax invoices found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer - Sticky */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          position: "sticky",
          bottom: 0,
          zIndex: 2,
          backgroundColor: "#f5f5f5",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Typography style={{ color: "#455571" }}>
          {isActive ? "Active" : "History"} Tax Invoices:{" "}
          {sortedInvoices.length} records
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
