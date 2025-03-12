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

const ViewExtAudit = ({ id }) => {
  console.log("Current ID:", id);

  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    // Simulated Data Fetch
    setAuditData([
      {
        event: "JOB CREATE EVENT",
        timestamp: "17/02/2025 17:30:56",
        remarks: "-",
        userId: "COMLG_U002",
        userName: "Adli Ifkar",
      },
      {
        event: "CK_DO_EXT_CREATE",
        timestamp: "17/02/2025 17:30:56",
        remarks: "CREATE",
        userId: "COMLG_U002",
        userName: "Adli Ifkar",
      },
      {
        event: "CK_DO_EXT_MODIFY",
        timestamp: "17/02/2025 17:30:56",
        remarks: "MODIFY",
        userId: "COMLG_U001",
        userName: "Adli Ifkar",
      },
      {
        event: "CK_DO_EXT_MODIFY",
        timestamp: "17/02/2025 17:30:56",
        remarks: "MODIFY",
        userId: "COMLG_U001",
        userName: "Adli Ifkar",
      },
    ]);
  }, []);

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
