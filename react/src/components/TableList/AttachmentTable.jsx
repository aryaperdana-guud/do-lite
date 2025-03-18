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
import {
  FileDownloadOutlined as FileDownloadIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

// Custom styles for the table
const tableStyles = {
  container: {
    maxHeight: 310,
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

const AttachmentTable = ({ data = [] }) => {
  return (
    <TableContainer component={Paper} sx={tableStyles.container}>
      <Table stickyHeader aria-label="attachments table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>Document ID</TableCell>
            <TableCell sx={tableStyles.headerCell}>Document Type</TableCell>
            <TableCell sx={tableStyles.headerCell}>Authoriser</TableCell>
            <TableCell sx={tableStyles.headerCell}>BL No</TableCell>
            <TableCell sx={tableStyles.headerCell}>DO No</TableCell>
            <TableCell sx={tableStyles.headerCell}>Created At</TableCell>
            <TableCell sx={tableStyles.headerCell}>Validity Date</TableCell>
            <TableCell sx={tableStyles.headerCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.documentID}</TableCell>
                <TableCell>{row.docType}</TableCell>
                <TableCell>{row.authoriser}</TableCell>
                <TableCell>{row.blNo}</TableCell>
                <TableCell>{row.doNo}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.validityDate}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Tooltip title="Download">
                      <IconButton size="small">
                        <FileDownloadIcon sx={{ color: "#0070c0" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: "#E57373" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No attachments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttachmentTable;
