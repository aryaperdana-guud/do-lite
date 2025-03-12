import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";

// Custom styles for the table
const tableStyles = {
  container: {
    maxHeight: 400,
    padding: 0,
    boxShadow: "none",
    borderRadius: "8px",
    "& .MuiTableHead-root": {
      bgcolor: "#f5f5f5",
    },
    "& .MuiTableRow-root:nth-of-type(even)": {
      bgcolor: "#f9f9f9",
    },
  },
  headerCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  actionButtons: {
    display: "flex",
    gap: 1,
  },
};

const AuditTable = ({ data = [] }) => {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table stickyHeader aria-label="audit log table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>Event</TableCell>
            <TableCell sx={tableStyles.headerCell}>Timestamp</TableCell>
            <TableCell sx={tableStyles.headerCell}>Remarks</TableCell>
            <TableCell sx={tableStyles.headerCell}>User ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Username</TableCell>
            <TableCell sx={tableStyles.headerCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.userID}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Tooltip title="Details">
                      <IconButton size="small" color="primary">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No audit logs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditTable;
