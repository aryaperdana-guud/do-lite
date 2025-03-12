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
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  Reply as ReplyIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

// Custom styles for the table
const tableStyles = {
  container: {
    maxHeight: 400,
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
  queryBox: {
    width: "100%",
    mt: 3,
    p: 2,
    bgcolor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  actionButtons: {
    display: "flex",
    gap: 1,
  },
  addQueryButton: {
    mt: 2,
    bgcolor: "#263754",
    color: "white",
    borderRadius: "10px",
    "&:hover": {
      bgcolor: "#1d2a43",
    },
  },
};

const QueryTable = ({ data = [] }) => {
  return (
    <>
      <TableContainer component={Paper} sx={tableStyles.container}>
        <Table stickyHeader aria-label="query table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyles.headerCell}>Query ID</TableCell>
              <TableCell sx={tableStyles.headerCell}>Requester</TableCell>
              <TableCell sx={tableStyles.headerCell}>Query</TableCell>
              <TableCell sx={tableStyles.headerCell}>Query Date</TableCell>
              <TableCell sx={tableStyles.headerCell}>Responder</TableCell>
              <TableCell sx={tableStyles.headerCell}>Response</TableCell>
              <TableCell sx={tableStyles.headerCell}>Response Date</TableCell>
              <TableCell sx={tableStyles.headerCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.queryID}</TableCell>
                  <TableCell>{row.requester}</TableCell>
                  <TableCell>{row.query}</TableCell>
                  <TableCell>{row.queryDate}</TableCell>
                  <TableCell>{row.responder}</TableCell>
                  <TableCell>{row.response}</TableCell>
                  <TableCell>{row.responseDate}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reply">
                        <IconButton size="small" color="primary">
                          <ReplyIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No queries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Query Section
      <Box sx={tableStyles.queryBox}>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Type your query here..."
          variant="outlined"
          sx={{ bgcolor: "white" }}
        />
        <Button
          variant="contained"
          startIcon={<ReplyIcon />}
          sx={tableStyles.addQueryButton}
        >
          SUBMIT QUERY
        </Button>
      </Box> */}
    </>
  );
};

export default QueryTable;
