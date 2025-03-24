"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Button,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { formatCurrency } from "./Utility/formatCurrency";
import { useParams } from "react-router-dom";

export function InvoiceTab() {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [invoices, setInvoices] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/doInv/${id}/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=tckDo.doDtCreate&mDataProp_1=tckMstInvoiceType.invtId&sSearch_1=I-IMF&iColumns=2`;

  useEffect(() => {
    async function fetchInvoices() {
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
            id: id,
            invoiceNumber: item.invNo || "-",
            invoiceType: item.tckMstInvoiceType.invtName || "-",
            invoiceRegion: item.invRegion || "-",
            invoiceCurrency: item.tmstCurrency.ccyCode || "-",
            invoiceAmount: formatCurrency(item.invAmount),
          })) || [];

        setInvoices(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setInvoices([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchInvoices();
    }
  }, [token]);

  //const displayData = tableData;

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

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const sortedInvoices = useMemo(() => {
    if (!sortConfig.key) return invoices;

    return [...invoices].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [invoices, sortConfig]);

  const SortableHeaderCell = ({ children, sortKey }) => (
    <TableCell
      onClick={() => handleSort(sortKey)}
      style={{
        color: "#455571",
        fontWeight: 700,
        backgroundColor: "#f5f5f5",
        position: "sticky",
        top: 0,
        zIndex: 1,
        cursor: "pointer",
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
        {sortConfig.key === sortKey &&
          (sortConfig.direction === "ascending" ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          ))}
      </div>
    </TableCell>
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "50vh", // Limit the maximum height
      }}
    >
      {/* Header - Sticky */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#263754",
          }}
        >
          Invoices
        </Typography>
      </Box>

      {/* Table Container with fixed height and scrollable content */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "none",
          flex: 1,
          overflow: "auto",
          height: "calc(100% - 120px)", // Adjust based on header and footer height
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                style={{
                  backgroundColor: "#f5f5f5",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
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
              <SortableHeaderCell sortKey="invoiceNumber">
                Invoice Number
              </SortableHeaderCell>
              <SortableHeaderCell sortKey="invoiceType">
                Invoice Type
              </SortableHeaderCell>
              <SortableHeaderCell sortKey="invoiceRegion">
                Invoice Region
              </SortableHeaderCell>
              <SortableHeaderCell sortKey="invoiceCurrency">
                Invoice Currency
              </SortableHeaderCell>
              <SortableHeaderCell sortKey="invoiceAmount">
                Invoice Amount
              </SortableHeaderCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 700,
                  backgroundColor: "#f5f5f5",
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

      {/* Footer - Sticky */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          pt: 2,
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
            borderRadius: 5,
            padding: 13,
          }}
        >
          Download All Invoices
        </Button>

        <Typography style={{ color: "#455571" }}>
          Showing {sortedInvoices.length} invoices
        </Typography>
      </Box>
    </div>
  );
}

export default InvoiceTab;
