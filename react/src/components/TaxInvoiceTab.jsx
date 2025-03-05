"use client";

import { useState } from "react";
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
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";
import { StatusIcon } from "./StatusRender";

// Sample data for active tax invoices
const activeTaxInvoices = [
  {
    id: 1,
    status: "accepted",
    invoiceNo: "PLF24122314340814",
    invoiceIssueDate: "24/12/2024 00:20:00",
    taxNumber: "111.007.23.00000118",
    customer: "Combi Logistics",
  },
];

// Sample data for history tax invoices
const historyTaxInvoices = [
  {
    id: 2,
    status: "accepted",
    invoiceNo: "PLF24110514220917",
    invoiceIssueDate: "05/11/2024 14:30:00",
    taxNumber: "111.007.23.00000095",
    customer: "Global Transport Co.",
  },
  {
    id: 3,
    status: "accepted",
    invoiceNo: "PLF24100812150633",
    invoiceIssueDate: "08/10/2024 09:45:00",
    taxNumber: "111.007.23.00000082",
    customer: "FastTrack Logistics",
  },
];

export function TaxInvoiceTab() {
  const [isActive, setIsActive] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Get the appropriate data based on the active/history toggle
  const taxInvoices = isActive ? activeTaxInvoices : historyTaxInvoices;

  const handleToggleChange = (event) => {
    setIsActive(event.target.checked);
    setPage(1); // Reset to first page when switching views
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#263754",
            fontWeight: 500,
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            ⊙ Tax Invoices List
          </span>
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

      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "none",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Invoice No
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Invoice Issue Date
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Tax Number
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Customer
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxInvoices.map((invoice) => (
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
            {taxInvoices.length === 0 && (
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography style={{ color: "#455571" }}>Column :</Typography>
            <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
              size="small"
              style={{
                backgroundColor: "white",
                width: "80px",
                height: "32px",
                borderRadius: "4px",
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton
              size="small"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              style={{
                color: "#455571",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                padding: "4px",
              }}
              disabled={page === 1}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography style={{ color: "#455571" }}>Page :</Typography>
            <Select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              size="small"
              style={{
                backgroundColor: "white",
                width: "80px",
                height: "32px",
                borderRadius: "4px",
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              {taxInvoices.length > rowsPerPage && (
                <MenuItem value={2}>2</MenuItem>
              )}
              {taxInvoices.length > rowsPerPage * 2 && (
                <MenuItem value={3}>3</MenuItem>
              )}
            </Select>
            <IconButton
              size="small"
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                color: "#455571",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                padding: "4px",
              }}
              disabled={page * rowsPerPage >= taxInvoices.length}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
