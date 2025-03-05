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
  Typography,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { StatusIcon } from "./StatusRender";

const extensions = [
  {
    id: 1,
    validTillDate: "28/02/2024",
    noContainers: "MSGU8630323 / 40HC",
    currency: "USD",
    amount: "250.00",
    submitDate: "15/02/2024",
    issueDate: "16/02/2024",
    extendedDO: "accepted",
    proformaInvoice: "accepted",
    platformFeeInvoice: "accepted",
    demurrageFinalInvoice: "pending",
    adminFeeFinalInvoice: "pending",
  },
  {
    id: 2,
    validTillDate: "01/03/2024",
    noContainers: "MSGU8630324 / 20HC",
    currency: "USD",
    amount: "180.00",
    submitDate: "16/02/2024",
    issueDate: "17/02/2024",
    extendedDO: "pending",
    proformaInvoice: "accepted",
    platformFeeInvoice: "pending",
    demurrageFinalInvoice: "rejected",
    adminFeeFinalInvoice: "pending",
  },
];

export function ExtensionsTab() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

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
            ⊙ Extensions
          </span>
        </Typography>
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
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "Valid Till Date",
                "No Containers",
                "Currency",
                "Amount",
                "Submit Date",
                "Issue Date",
                "Extended DO",
                "Proforma Invoice",
                "Platform Fee Invoice",
                "Demurrage Final Invoice",
                "Admin Fee Final Invoice",
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{
                    color: "#455571",
                    fontWeight: 500,
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
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
              >
                <TableCell>{extension.validTillDate}</TableCell>
                <TableCell>{extension.noContainers}</TableCell>
                <TableCell>{extension.currency}</TableCell>
                <TableCell>{extension.amount}</TableCell>
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
              {extensions.length > rowsPerPage && (
                <MenuItem value={2}>2</MenuItem>
              )}
              {extensions.length > rowsPerPage * 2 && (
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
              disabled={page * rowsPerPage >= extensions.length}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
