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
import { useParams } from "react-router-dom";

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
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const urlid = id;
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/common/entity/auditLog/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=audtTimestamp&mDataProp_1=audtReckey&sSearch_1=${urlid}&mDataProp_2=audtReckey&sSearch_2=${urlid}&iColumns=3`;

  useEffect(() => {
    if (!token) return;

    async function fetchAuditData() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Extract the audit data from the aaData array
        const auditItems = responseData.aaData || [];

        const formattedData = auditItems.map((audit) => ({
          event: audit.audtEvent || "-",
          timestamp: audit.audtTimestamp || "-",
          remarks: audit.audtRemarks || "-",
          userID: audit.audtUid || "-",
          username: audit.audtUname || "-",
        }));

        setAuditData(formattedData);
      } catch (error) {
        console.error("Error fetching audit data:", error);
      }
    }

    fetchAuditData();
  }, [token]);
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
