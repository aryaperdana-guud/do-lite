import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useUserStore } from "../useUserStore";
import { formatDateTime } from "../components/Utility/formatDate";

const UserActivityLog = () => {
  const { user } = useUserStore();
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [orderBy, setOrderBy] = useState("audtTimestamp");
  const [order, setOrder] = useState("desc"); // Ensuring "desc" is the default for newest to latest

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.userId) {
        setError("User information not available");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        // Get sort column index
        let sortColIndex = 0;
        switch (orderBy) {
          case "audtEvent":
            sortColIndex = 0; // Index for Event column
            break;
          case "audtTimestamp":
            sortColIndex = 1; // Index for Timestamp column
            break;
          case "audtRemarks":
            sortColIndex = 2; // Index for Remarks column
            break;
          case "audtUid":
            sortColIndex = 3; // Index for User ID column
            break;
          case "audtUname":
            sortColIndex = 4; // Index for User Name column
            break;
          default:
            sortColIndex = 1; // Default to timestamp column
        }

        // Build API URL with query parameters
        const baseUrl =
          "https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/common/entity/auditLog/list";
        const params = new URLSearchParams({
          sEcho: "3",
          iDisplayStart: String(page * rowsPerPage),
          iDisplayLength: String(rowsPerPage),
          iSortCol_0: String(sortColIndex),
          sSortDir_0: order,
          iSortingCols: "1",
          mDataProp_0: "audtTimestamp",
          mDataProp_1: "audtReckey",
          sSearch_1: user.userId,
          mDataProp_2: "audtReckey",
          sSearch_2: user.userId,
          iColumns: "3",
        });

        const apiUrl = `${baseUrl}?${params.toString()}`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.aaData) {
          setActivityData(response.data.aaData);
          setTotalRecords(response.data.iTotalDisplayRecords || 0);
        } else {
          setError("Invalid response format from server");
          console.error("Invalid response format:", response.data);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch activity data. Please try again later.");
        setLoading(false);
        console.error("Error fetching activity data:", err);
      }
    };

    fetchData();
  }, [page, rowsPerPage, order, orderBy, user]);

  // Create the sortable table header
  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };

  return (
    <Box
      sx={{
        p: 1,
        bgcolor: "#ffffff",
        height: "calc(100vh - 370px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          User Activity Log
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            overflow: "auto",
            maxHeight: "calc(100vh - 220px)",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table stickyHeader aria-label="user activity log table">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f0f4f8" }}>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "audtEvent"}
                      direction={orderBy === "audtEvent" ? order : "asc"}
                      onClick={createSortHandler("audtEvent")}
                    >
                      Event
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "audtTimestamp"}
                      direction={orderBy === "audtTimestamp" ? order : "asc"}
                      onClick={createSortHandler("audtTimestamp")}
                    >
                      Timestamp
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "audtRemarks"}
                      direction={orderBy === "audtRemarks" ? order : "asc"}
                      onClick={createSortHandler("audtRemarks")}
                    >
                      Remarks
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "audtUid"}
                      direction={orderBy === "audtUid" ? order : "asc"}
                      onClick={createSortHandler("audtUid")}
                    >
                      User ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "audtUname"}
                      direction={orderBy === "audtUname" ? order : "asc"}
                      onClick={createSortHandler("audtUname")}
                    >
                      User Name
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityData.map((row) => (
                  <TableRow key={row.audtId}>
                    <TableCell>{row.audtEvent}</TableCell>
                    <TableCell>{formatDateTime(row.audtTimestamp)}</TableCell>
                    <TableCell>{row.audtRemarks || "-"}</TableCell>
                    <TableCell>{row.audtUid}</TableCell>
                    <TableCell>{row.audtUname}</TableCell>
                  </TableRow>
                ))}
                {activityData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No activity data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Box sx={{ mt: "auto", pt: 1 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
              sx: {
                "& .MuiTablePagination-select": {
                  paddingRight: "24px", // Add more space for the arrow
                  textAlignLast: "left",
                },
                "& .MuiTablePagination-selectIcon": {
                  right: 0,
                  position: "absolute",
                },
              },
            }}
            sx={{
              ".MuiTablePagination-selectRoot": {
                position: "relative",
                marginRight: 2,
              },
              ".MuiTablePagination-select": {
                minWidth: "3rem", // Ensure enough width for numbers
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserActivityLog;
