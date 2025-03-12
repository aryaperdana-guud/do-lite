import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  CalendarToday as CalendarTodayIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
} from "@mui/icons-material";
import SelectedBOL from "./TableList/SelectedBOL";

// Dummy data structure
const dummyClaimData = {
  generalDetails: {
    jobId: "DOJF6576152415172006",
    shipmentType: "IMPORT",
  },
  jobDateDetails: {
    startDate: "2025-02-15",
    expiryDate: "2025-03-15",
  },
  selectedBOLs: [
    {
      blNo: "MEDUU12345",
      containerNo: "MSDU1234567890",
      shippingLine: "SHIPPING LINE 1",
      authoriser: "CARGO OWNER 1",
      blDateSubmitted: "10/02/2025 15:51:07",
    },
    {
      blNo: "MEDUU12346",
      containerNo: "MSDU1234567891",
      shippingLine: "SHIPPING LINE 2",
      authoriser: "CARGO OWNER 2",
      blDateSubmitted: "11/02/2025 09:23:45",
    },
  ],
  chargeDetails: {
    jobCharge: "Rp 3.000.000",
  },
};

// Custom styles to match myDO details
const cardStyles = {
  root: {
    mb: 3,
    boxShadow: "none",
    borderRadius: "10px",
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
  inputField: {
    bgcolor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    p: 1,
    mb: 1,
  },
};

const DOClaimViewClaimDetails = () => {
  const [claimData, setClaimData] = useState({
    generalDetails: {},
    jobDateDetails: {},
    selectedBOLs: [],
    chargeDetails: {},
  });

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        setClaimData(dummyClaimData);
      }, 100);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          {/* General Details Card */}
          <Card sx={cardStyles.root}>
            <CardHeader
              sx={cardStyles.header}
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingOutlinedIcon />
                  <Typography variant="h5">General Details</Typography>
                </Box>
              }
            />
            <CardContent sx={cardStyles.content}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Job ID</Typography>
                <Input
                  fullWidth
                  value={claimData.generalDetails.jobId || ""}
                  readOnly
                  disabled
                  sx={cardStyles.inputField}
                />
              </Box>
              <Box>
                <Typography variant="h6">Shipment Type</Typography>
                <Input
                  fullWidth
                  value={claimData.generalDetails.shipmentType || ""}
                  readOnly
                  disabled
                  sx={cardStyles.inputField}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Bill of Loading Sample */}
          {/* <Card sx={cardStyles.root}>
            <CardHeader
              sx={cardStyles.header}
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DescriptionOutlinedIcon />
                  <Typography variant="h5">Bill of Loading</Typography>
                </Box>
              }
            />
            <CardContent sx={cardStyles.content}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">BL Document</Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ bgcolor: "#ffffff" }}
                  >
                    BROWSE
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ bgcolor: "#ffffff" }}
                  >
                    <FileDownloadOutlinedIcon />
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card> */}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          {/* Job Date Details Card */}
          <Card sx={cardStyles.root}>
            <CardHeader
              sx={cardStyles.header}
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon />
                  <Typography variant="h5">Job Date Details</Typography>
                </Box>
              }
            />
            <CardContent sx={cardStyles.content}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Start Date</Typography>
                <Input
                  fullWidth
                  type="date"
                  value={claimData.jobDateDetails.startDate || ""}
                  sx={cardStyles.inputField}
                />
              </Box>
              <Box>
                <Typography variant="h6">Expiry Date</Typography>
                <Input
                  fullWidth
                  type="date"
                  value={claimData.jobDateDetails.expiryDate || ""}
                  sx={cardStyles.inputField}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected BOL Table */}
      <Box sx={{ mt: 0 }}>
        <SelectedBOL data={claimData.selectedBOLs} />
      </Box>

      {/* Charge Details Card */}
      <Card sx={{ ...cardStyles.root, mt: 3 }}>
        <CardHeader
          sx={cardStyles.header}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ReceiptOutlinedIcon />
              <Typography variant="h5">Charge Details</Typography>
            </Box>
          }
        />
        <CardContent sx={cardStyles.content}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ width: 150 }}>
              Job Charge
            </Typography>
            <Input
              fullWidth
              value={claimData.chargeDetails.jobCharge || ""}
              readOnly
              disabled
              sx={cardStyles.inputField}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DOClaimViewClaimDetails;
