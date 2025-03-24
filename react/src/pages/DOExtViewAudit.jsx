import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Clock, Printer, Download } from "lucide-react";
import { formatDateTime } from "../components/Utility/formatDate";
import { useParams } from "react-router-dom";

const ViewExtAudit = () => {
  const [auditData, setAuditData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `
https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/common/entity/auditLog/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=audtTimestamp&mDataProp_1=audtReckey&sSearch_1${id}&mDataProp_2=audtReckey&sSearch_2=${id}&iColumns=3`;
  useEffect(() => {
    async function fetchAuditData() {
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
            event: item.audtEvent || "-",
            timestamp: formatDateTime(item.audtTimestamp),
            remarks: item.audtRemarks || "-",
            userId: item.audtUid || "Unknown",
            userName: item.audtUname || "Unknown",
          })) || [];

        setAuditData(formattedData);
        console.log("Full formattedData:", formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAuditData([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchAuditData();
    }
  }, [token]);

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          borderRadius: "10px",
          mb: 3,
          p: 1,
          bgcolor: "#f5f5f5",
          boxShadow: "none",
        }}
      >
        <CardHeader
          sx={{
            bgcolor: "#f5f5f5",
            borderBottom: "1px solid #e0e0e0",
            p: 2,
          }}
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Clock size={18} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Audit
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Event</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.event}</TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.remarks}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Printer size={16} />}
          sx={{ bgcolor: "#263754" }}
        >
          PRINT
        </Button>
        <Button
          variant="contained"
          startIcon={<Download size={16} />}
          sx={{ bgcolor: "#263754" }}
        >
          CSV
        </Button>
      </Box>
    </Box>
  );
};

export default ViewExtAudit;
