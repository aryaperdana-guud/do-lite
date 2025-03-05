import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { px } from "framer-motion";
import { AlignLeftIcon, ChevronLeft, ChevronRight } from "lucide-react";

function PaymentDetails() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      description: "INVOICE IMPORT (LOCAL)",
      qty: 1,
      currency: "IDR",
      amount: 2345088,
    },
    {
      id: 2,
      description: "INVOICE PLATFORM FEE",
      qty: 1,
      currency: "IDR",
      amount: 2345,
    },
    {
      id: 3,
      description: "INVOICE IMPORT MANIFEST",
      qty: 1,
      currency: "IDR",
      amount: 1234567,
    },
  ]);

  const calculateTotal = () => {
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        height: "calc(100vh - 180px)",
      }}
    >
      <h2 style={{ marginBottom: "20px", marginTop: "none" }}>
        Payment Details
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fafafa",
              border: "1px solid #e0e0e0",
              borderRadius: "15px",
              mb: 2,
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", p: 2, pb: 0 }}>
              List of Invoice
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S/No</TableCell>
                    <TableCell>Item Description</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Invoices</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.qty}</TableCell>
                      <TableCell>{invoice.currency}</TableCell>
                      <TableCell>{invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          <DownloadIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography sx={{ color: "#213547" }}>
                Columns: {invoices.length}
              </Typography>
              <Box>
                <Button sx={{ color: "#213547" }}>
                  <ChevronLeft />
                </Button>
                <Button sx={{ color: "#213547" }}>Page 1</Button>
                <Button sx={{ color: "#213547" }}>
                  <ChevronRight />
                </Button>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fafafa",
              border: "1px solid #e0e0e0",
              borderRadius: "15px",
              mb: 2,
            }}
          >
            <Typography variant="h6">Total IDR</Typography>
            <Typography variant="h5">
              Rp {calculateTotal().toLocaleString()}
            </Typography>
            <Typography>Via IDR VA</Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e0e0e0",
              p: 2,
              backgroundColor: "#f0f0f0",
              borderRadius: "15px",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
              General Details
            </Typography>
            <TextField
              fullWidth
              label="Payment Reference"
              variant="outlined"
              sx={{ backgroundColor: "white", mb: 2 }}
            />
            <TextField
              fullWidth
              label="Billing Date"
              variant="outlined"
              sx={{ backgroundColor: "white", mb: 2 }}
            />
            <TextField
              fullWidth
              label="Paid Date"
              variant="outlined"
              sx={{ backgroundColor: "white", mb: 3 }}
            />
            <Button fullWidth variant="contained" color="primary" size="large">
              SUBMIT PAYMENT
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentDetails;
