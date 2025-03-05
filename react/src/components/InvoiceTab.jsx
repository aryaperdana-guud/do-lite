import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Sample data
const invoices = [
  {
    id: 1,
    invoiceNumber: "PLF241223143408147",
    invoiceType: "INVOICE PLATFORM FEE",
    invoiceRegion: "...",
    invoiceCurrency: "IDR",
    invoiceAmount: "Rp 2.000",
  },
  {
    id: 2,
    invoiceNumber: "PLF241223143408147",
    invoiceType: "INVOICE PLATFORM FEE",
    invoiceRegion: "...",
    invoiceCurrency: "IDR",
    invoiceAmount: "Rp 2.000",
  },
];

export function InvoiceTab() {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedInvoices(invoices.map((invoice) => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectOne = (id) => {
    const selectedIndex = selectedInvoices.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedInvoices, id];
    } else {
      newSelected = selectedInvoices.filter((item) => item !== id);
    }

    setSelectedInvoices(newSelected);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#263754",
        }}
      >
        <FileDownloadIcon />
        Invoices
      </Typography>

      <TableContainer
        component={Paper}
        style={{ backgroundColor: "#f5f5f5", boxShadow: "none" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedInvoices.length > 0 &&
                    selectedInvoices.length < invoices.length
                  }
                  checked={selectedInvoices.length === invoices.length}
                  onChange={handleSelectAll}
                  style={{ color: "#0070c0" }}
                />
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Invoice Number
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Invoice Type
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Invoice Region
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Invoice Currency
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Invoice Amount
              </TableCell>
              <TableCell style={{ color: "#455571", fontWeight: 500 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                hover
                style={{ backgroundColor: "white", borderRadius: "8px" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectOne(invoice.id)}
                    style={{ color: "#0070c0" }}
                  />
                </TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.invoiceType}</TableCell>
                <TableCell>{invoice.invoiceRegion}</TableCell>
                <TableCell>{invoice.invoiceCurrency}</TableCell>
                <TableCell>{invoice.invoiceAmount}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          style={{
            backgroundColor: "#263754",
            color: "white",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          DOWNLOAD ALL INVOICES
        </Button>

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
              style={{ color: "#455571" }}
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
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
            <IconButton
              size="small"
              onClick={() => setPage((prev) => prev + 1)}
              style={{ color: "#455571" }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
