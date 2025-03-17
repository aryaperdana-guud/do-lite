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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { Ship, CalendarPlus2, ReceiptText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContainerTable from "../components/TableList/ContainerTable";

const DOExtGenDetails = ({ id, title }) => {
  const navigate = useNavigate();
  const [containerData, setContainerData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedContainers, setSelectedContainers] = useState({});

  // Format date to Indonesian format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

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

  useEffect(() => {
    // Simulating API fetch for container data
    const fetchData = async () => {
      // In a real app, this would be an API call
      const data = [
        {
          marksAndNumber: "MSDU760099 / 45DV",
          containerCat: "STANDARD",
          dangerousGood: "YES",
          vtd: "20/02/2025",
          nextvtd: "20/03/2025",
          extDays: "30",
        },
        {
          marksAndNumber: "MSDU760100 / 45DV",
          containerCat: "STANDARD",
          dangerousGood: "YES",
          vtd: "20/02/2025",
          nextvtd: "20/03/2025",
          extDays: "30",
        },
        {
          marksAndNumber: "MSDU760101 / 45DV",
          containerCat: "STANDARD",
          dangerousGood: "YES",
          vtd: "20/02/2025",
          nextvtd: "20/03/2025",
          extDays: "30",
        },
        {
          marksAndNumber: "MSDU760101 / 45DV",
          containerCat: "STANDARD",
          dangerousGood: "YES",
          vtd: "20/02/2025",
          nextvtd: "20/03/2025",
          extDays: "30",
        },
      ];
      setContainerData(data);
    };

    fetchData();
  }, []);

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
                      value="CKJOB241218183084"
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
                      value="DO010122035TES"
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
                      value="DO010122035TES"
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
                      value={formatDate("2025-03-03")}
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
                  value="4"
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
                <Button variant="contained" color="primary">
                  CALCULATE
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Admin Fee</Typography>
                <TextField
                  fullWidth
                  value="Rp 20.000,-"
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
                  value="Rp 75.000,-"
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
                  value="Rp 1.254.720.000,-"
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
                  value="Rp 1.254.815.000,-"
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
