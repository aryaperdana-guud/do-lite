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

// Sample data for containers
const containers = [
  {
    id: 1,
    marksNumber: "MSGU8630323 / 40HC",
    packages: "89",
    description: "-",
    measurements: "21018",
    validateTill: "20/02/2024",
  },
  {
    id: 2,
    marksNumber: "MSGU8630323 / 40HC",
    packages: "89",
    description: "-",
    measurements: "21018",
    validateTill: "20/02/2024",
  },
];

export function ContainersTab() {
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
            ⊙ Containers
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
                Marks and Number
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Number of Packages
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Weight and Measurements
              </TableCell>
              <TableCell
                style={{
                  color: "#455571",
                  fontWeight: 500,
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Validate Till Date
              </TableCell>
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
              {containers.length > rowsPerPage && (
                <MenuItem value={2}>2</MenuItem>
              )}
              {containers.length > rowsPerPage * 2 && (
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
              disabled={page * rowsPerPage >= containers.length}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
