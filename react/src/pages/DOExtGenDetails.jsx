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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Ship,
  CalendarPlus2,
  Container,
  ReceiptText,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DOExtGenDetails = ({ id }) => {
  const navigate = useNavigate();
  const [containerData, setContainerData] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Format date to Indonesian format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  const handleConfirmClick = () => {
    setShowConfirmPopup(true);
  };

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
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
          marksAndNumber: "MSDU760102 / 45DV",
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
                  sx={{ bgcolor: "#ffffff", mb: 2 }}
                />
              </CardContent>
            </Card>

            <Card
              sx={{
                mb: 3,
                bgcolor: "#f5f5f5",
                borderRadius: "10px",
                padding: "10px",
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
                    <Container size={18} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Containers for Extension
                    </Typography>
                  </Box>
                }
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell>Marks And Number</TableCell>
                        <TableCell>Container Cat</TableCell>
                        <TableCell>Dangerous Good</TableCell>
                        <TableCell>VTD</TableCell>
                        <TableCell>Next VTD</TableCell>
                        <TableCell>Ext Days</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {containerData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.marksAndNumber}</TableCell>
                          <TableCell>{row.containerCat}</TableCell>
                          <TableCell>{row.dangerousGood}</TableCell>
                          <TableCell>{row.vtd}</TableCell>
                          <TableCell>{row.nextvtd}</TableCell>
                          <TableCell>{row.extDays}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
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
            <Box sx={{ mb: 3 }}>
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

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmPopup}
        onClose={handleCloseConfirmPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#f5f5f5", textAlign: "center" }}>
          <Typography variant="h5">CONFIRMATION</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 1 }}>
            Are you sure want to confirm?
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Extensions Job cannot be deleted or changed after confirmed
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ bgcolor: "#f8f8f8", p: 2, borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: "#555" }}>
              DO submissions will be processed for the DO request on{" "}
              <strong>8:30 AM until 4:30 PM</strong>. Late submissions will be
              handled the next working day. Please ensure your documents are
              complete and meet the requirements.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3, justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmPopup}
            sx={{ px: 4 }}
          >
            NO
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Confirmed!");
              handleCloseConfirmPopup();
            }}
            sx={{ px: 4 }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DOExtGenDetails;
