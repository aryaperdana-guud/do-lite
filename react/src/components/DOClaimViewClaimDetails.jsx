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
import { useParams } from "react-router-dom";
import { formatDate, formatDateTime } from "./Utility/formatDate";
import { formatCurrency } from "./Utility/formatCurrency";
import useSessionStore from "../SessionControl/SessionStore";

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
  const { id } = useParams();
  const jobId = id;

  const [claimData, setClaimData] = useState({
    generalDetails: {
      jobId: jobId || "",
      shipmentType: "",
    },
    jobDateDetails: {
      startDate: "",
      expiryDate: "",
    },
    selectedBOLs: [],
    chargeDetails: {
      jobCharge: "",
    },
  });

  const token = localStorage.getItem("jwtToken");
  const BaseApiUrl =
    "https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/job/ckJobDoClaim";
  const apiUrl = `${BaseApiUrl}/${jobId}`;

  // State to manage the editable dates
  const [startDate, setStartDate] = useState(
    claimData.jobDateDetails.startDate || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    claimData.jobDateDetails.expiryDate || ""
  );

  // Handle changes for the start date
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Handle changes for the expiry date
  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  useEffect(() => {
    if (!jobId || !token) return;

    async function fetchClaimData() {
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

        const formattedData = {
          generalDetails: {
            jobId: jobId || "-",
            shipmentType:
              responseData.tckJob?.tckMstShipmentType?.shtName || "-",
          },
          jobDateDetails: {
            startDate:
              formatDate(responseData.tckJob?.tckRecordDate?.rcdDtStart) || "-",
            expiryDate:
              formatDate(responseData.tckJob?.tckRecordDate?.rcdDtExpiry) ||
              "-",
          },
          selectedBOLs:
            Array.isArray(responseData.selectedBls) &&
            responseData.selectedBls.length > 0
              ? responseData.selectedBls.map((bl) => ({
                  idForQuery: responseData.tckJob.jobId || "-",
                  //
                  blNo: bl.doiBlNo || "-",
                  shippingType: bl.shtId || "-",
                  shippingLine: bl.slAccnId || "-",
                  authoriser: bl.accnName || "-",
                  blDateSubmitted: formatDateTime(bl.rcdDtSubmit) || "-",
                }))
              : [],
          chargeDetails: {
            jobCharge: formatCurrency(responseData.totalChargesIdr),
          },
        };

        setClaimData(formattedData);

        // 🔥 Update Zustand store with the extracted ID
        const firstId =
          formattedData.selectedBOLs.length > 0
            ? formattedData.selectedBOLs[0].idForQuery
            : null;
        useSessionStore.getState().setKeyForB(firstId);
      } catch (error) {
        console.error("Error fetching claim data:", error);
      }
    }

    fetchClaimData();
  }, [jobId, token, apiUrl]);

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
                  value={jobId || ""}
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
                  defaultValue={claimData.jobDateDetails.startDate || ""}
                  onChange={handleStartDateChange}
                  sx={cardStyles.inputField}
                  type="date"
                />
              </Box>
              <Box>
                <Typography variant="h6">Expiry Date</Typography>
                <Input
                  fullWidth
                  defaultValue={claimData.jobDateDetails.expiryDate || ""}
                  onChange={handleExpiryDateChange}
                  sx={cardStyles.inputField}
                  type="date"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selected BOL Table */}
      <Box sx={{ mt: 0 }}>
        <SelectedBOL data={claimData.selectedBOLs || []} />
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
