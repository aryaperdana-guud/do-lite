// ExtAuditTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
} from "@mui/material";

const ExtAuditTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Apply pagination to the data
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ boxShadow: 0, mb: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="audit table">
          <TableHead sx={{ backgroundColor: "#263754" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Event
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Timestamp
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Remarks
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                User ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                User Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
              >
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.userName}</TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ExtAuditTable;
