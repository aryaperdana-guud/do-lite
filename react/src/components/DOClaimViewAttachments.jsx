import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { PaperclipIcon } from "lucide-react";
import { Add as AddIcon, Check as CheckIcon } from "@mui/icons-material";
import AttachmentTable from "./TableList/AttachmentTable";

// Dummy data structure
const dummyAttachmentData = [
  {
    documentID: "CKJA1234567890",
    docType: "POWER OF AUTHORITY",
    authoriser: "CARGO OWNER 1",
    blNo: "MEDUU12345",
    doNo: "DO1234567890",
    createdAt: "10/02/2025 15:51:07",
    validityDate: "10/02/2025 15:51:07",
  },
  {
    documentID: "CKJA1234567890",
    docType: "CONTAINER GUARANTEE",
    authoriser: "CARGO OWNER 1",
    blNo: "MEDUU12345",
    doNo: "DO1234567890",
    createdAt: "10/02/2025 15:51:07",
    validityDate: "10/02/2025 15:51:07",
  },
];

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

const DOClaimViewAttachments = () => {
  const [attData, setAttData] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        setAttData(dummyAttachmentData);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Attachments Card */}
      <Card sx={cardStyles.root}>
        <CardHeader
          sx={cardStyles.header}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaperclipIcon size={24} />
              <Typography variant="h5">Attachments</Typography>
            </Box>
          }
        />
        <CardContent sx={cardStyles.content}>
          <AttachmentTable data={attData} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#263754",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#1d2a43",
                },
              }}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{
                bgcolor: "#39E839",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#2dc02d",
                },
              }}
            >
              CONFIRM
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DOClaimViewAttachments;
