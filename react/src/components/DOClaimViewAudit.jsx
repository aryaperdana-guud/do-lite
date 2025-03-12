import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Printer, Download } from "lucide-react";
import AuditTable from "./TableList/AuditTable";

// Custom styles to match myDO details
const cardStyles = {
  root: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    mb: 3,
  },
  header: {
    bgcolor: "#f5f5f5",
    borderBottom: "1px solid #e0e0e0",
    padding: "12px 16px",
  },
  content: {
    bgcolor: "#eaeaea",
    padding: "16px",
  },
};

// Dummy data structure
const dummyAuditData = [
  {
    event: "DO CLAIM JOB MODIFY",
    timestamp: "12/02/2025 15:09:38",
    remarks: "MODIFY",
    userID: "COMLG_U002",
    username: "ABCDEFG",
  },
  {
    event: "DO CLAIM JOB MODIFY",
    timestamp: "12/02/2025 15:09:38",
    remarks: "MODIFY",
    userID: "COMLG_U002",
    username: "ABCDEFG",
  },
];

const DOClaimViewAudit = () => {
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        setAuditData(dummyAuditData);
      }, 100);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Audit Card */}
      <Card sx={cardStyles.root}>
        <CardHeader
          sx={cardStyles.header}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h5">Audit Log</Typography>
            </Box>
          }
        />
        <CardContent sx={cardStyles.content}>
          <AuditTable data={auditData} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<Printer size={16} />}
              sx={{
                bgcolor: "#263754",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#1d2a43",
                },
              }}
            >
              PRINT
            </Button>
            <Button
              variant="contained"
              startIcon={<Download size={16} />}
              sx={{
                bgcolor: "#263754",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#1d2a43",
                },
              }}
            >
              CSV
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DOClaimViewAudit;
