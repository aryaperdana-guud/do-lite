import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { Ship, CalendarPlus2, ReceiptText, LogOut } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ContainerTable from "../components/TableList/ContainerTable";
import { formatCurrency } from "../components/Utility/formatCurrency";
import { formatDate } from "../components/Utility/formatDate";
import { ExitToApp } from "@mui/icons-material";
import useSessionStore from "../SessionControl/SessionStore";

const DOExtGenDetails = ({ title }) => {
  const navigate = useNavigate();
  const [containerData, setContainerData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedContainers, setSelectedContainers] = useState({});

  // Handle container selection from child component
  const handleContainerSelectionChange = (selectionData) => {
    setSelectedContainers(selectionData);
    // You can perform additional actions based on selection here
  };

  // Handle dangerous good toggle from child component
  const handleDangerousGoodToggle = (index) => {
    const updatedData = [...containerData];
    updatedData[index] = {
      ...updatedData[index],
      dangerousGood: updatedData[index].dangerousGood === "YES" ? "NO" : "YES",
    };
    setContainerData(updatedData);
  };

  

  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/extension/doExt/${id}`;
  const [ExtendDetailData, setExtendDetailData] = useState([]);

  useEffect(() => {
    if (!token || !id) return;

    async function fetchExtendDetailData() {
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

        // Check if the response is an array or a single object
        const dataItem = Array.isArray(responseData)
          ? responseData[0]
          : responseData;

        // Create a single object instead of an array
        const formattedData = {
          ExtJobNumber: id,
          DoNumber: dataItem?.tckDo?.doNo || "N/A",
          DoExNumber: dataItem?.doxExtDoNo || "N/A",
          ValidtillDate: dataItem?.doxValidDate
            ? formatDate(dataItem.doxValidDate)
            : "N/A",
          NumberOfContainer: dataItem?.doxNoCnt || "N/A",
          AdminFee: formatCurrency(dataItem?.doxChargesAdmin || 0),
          PlatformFee: formatCurrency(dataItem?.doxChargesPlf || 0),
          Demurrage: formatCurrency(dataItem?.doxChargesExt || 0),
          TotalCharges: formatCurrency(dataItem?.doxChargesTotal || 0),
        };

        setExtendDetailData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchExtendDetailData();
  }, [token, id, apiUrl]);
  return (
    <Box>
      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={5}>
            <Card sx={{ mb: 3, borderRadius: "10px", boxShadow: "none" }}>
              <CardHeader
                sx={{
                  bgcolor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                  boxShadow: "none",
                  p: 2,
                }}
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Ship size={18} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      General Details
                    </Typography>
                  </Box>
                }
              />
              <CardContent sx={{ bgcolor: "#f9f9f9", boxShadow: "none" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Ext Job Number</Typography>
                    <TextField
                      fullWidth
                      value={ExtendDetailData.ExtJobNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ bgcolor: "#ffffff", mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">DO Number</Typography>
                    <TextField
                      fullWidth
                      value={ExtendDetailData.DoNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ bgcolor: "#ffffff", mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">DO Ex Number</Typography>
                    <TextField
                      fullWidth
                      value={ExtendDetailData.DoExNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ bgcolor: "#ffffff", mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Valid Till Date</Typography>
                    <TextField
                      fullWidth
                      value={ExtendDetailData.ValidtillDate}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ bgcolor: "#ffffff" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 3, borderRadius: "10px", boxShadow: "none" }}>
              <CardHeader
                sx={{
                  bgcolor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                  p: 2,
                }}
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarPlus2 size={18} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Extension Details
                    </Typography>
                  </Box>
                }
              />
              <CardContent sx={{ bgcolor: "#f9f9f9" }}>
                <Typography variant="subtitle1">No of Container</Typography>
                <TextField
                  fullWidth
                  value={ExtendDetailData.NumberOfContainer}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{ bgcolor: "#ffffff", mb: 2 }}
                />
              </CardContent>
            </Card>

            {/* Using the new ContainerTable component */}

            <ContainerTable
              containerData={containerData}
              onSelectionChange={handleContainerSelectionChange}
              onDangerousGoodToggle={handleDangerousGoodToggle}
            />
          </Grid>
        </Grid>
        {/* Extension Charge Section */}
        <Card sx={{ mb: 3, borderRadius: "10px", boxShadow: "none" }}>
          <CardHeader
            sx={{
              bgcolor: "#f5f5f5",
              borderBottom: "1px solid #e0e0e0",
              p: 2,
            }}
            title={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ReceiptText size={18} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Extension Charge
                </Typography>
              </Box>
            }
          />
          <CardContent sx={{ bgcolor: "#f9f9f9" }}>
            <Box sx={{ mb: 3, justifyContent: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  New Valid Till Date <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#ffffff", width: "200px", mr: 2 }}
                />
                <Button variant="contained" sx={{ bgcolor: "#263754" }}>
                  CALCULATE
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Admin Fee</Typography>
                <TextField
                  fullWidth
                  value={ExtendDetailData.AdminFee}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#ffffff", mb: 2 }}
                />

                <Typography variant="subtitle1">Platform Fee</Typography>
                <TextField
                  fullWidth
                  value={ExtendDetailData.PlatformFee}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Demurrage</Typography>
                <TextField
                  fullWidth
                  value={ExtendDetailData.Demurrage}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#ffffff", mb: 2 }}
                />

                <Typography variant="subtitle1">Total Charges</Typography>
                <TextField
                  fullWidth
                  value={ExtendDetailData.TotalCharges}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DOExtGenDetails;
