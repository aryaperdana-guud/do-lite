import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import axios from "axios";

const UserInfoForm = () => {
  const [userData, setUserData] = useState({
    userId: "",
    accountId: "",
    documentNumber: "",
    name: "",
    designation: "",
    department: "",
    officePhone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    postalCode: "",
    province: "",
    country: "ID - INDONESIA",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const API_URL =
          "https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/cac/profile/";

        const AUTH_TOKEN = localStorage.getItem("jwtToken");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });

        const { user } = response.data;
        const { coreAccn } = user;

        // Get department from roles
        const roles = user.role.split(",");
        const department = roles.length > 0 ? roles[0] : "";

        // Get document number (using company registration number)
        const documentNumber = coreAccn.accnCoyRegn || "";

        // Map API response to userData state
        setUserData({
          userId: user.id,
          accountId: coreAccn.accnName,
          documentNumber: documentNumber,
          name: user.name,
          designation: user.authorities[0]?.authority || "-",
          department: department,
          officePhone: coreAccn.accnContact?.contactTel || "-",
          email: user.email,
          addressLine1: coreAccn.accnAddr?.addrLn1 || "-",
          addressLine2: coreAccn.accnAddr?.addrLn2 || "-",
          addressLine3: coreAccn.accnAddr?.addrLn3 || "-",
          city: coreAccn.accnAddr?.addrCity || "-",
          postalCode: coreAccn.accnAddr?.addrPcode || "-",
          province: coreAccn.accnAddr?.addrProv || "-",
          country: coreAccn.accnAddr?.addrCtry
            ? `${coreAccn.accnAddr.addrCtry} - ${coreAccn.accnNationality}`
            : "ID - INDONESIA",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Country options
  const countries = [
    { value: "ID - INDONESIA", label: "ID - INDONESIA" },
    { value: "SG - SINGAPORE", label: "SG - SINGAPORE" },
    { value: "MY - MALAYSIA", label: "MY - MALAYSIA" },
    { value: "TH - THAILAND", label: "TH - THAILAND" },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 1,
        bgcolor: "#fff",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "#f0f0f0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <PersonOutlineOutlinedIcon />
              <Typography variant="h5">User Information</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">User ID *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.userId}
                  disabled
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Account ID</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.accountId}
                  disabled
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">
                  Identify Document Number *
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.documentNumber}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Name *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.name}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Designation *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.designation}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Department *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.department}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "#f0f0f0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <ContactMailOutlinedIcon />
              <Typography variant="h5">Contact Information</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Office Telephone *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.officePhone}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Email *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.email}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: "#f0f0f0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <BusinessOutlinedIcon />
              <Typography variant="h5">Address Details</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Address (Line 1) *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.addressLine1}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Address (Line 2)</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.addressLine2}
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Address (Line 3)</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.addressLine3}
                  sx={{ bgcolor: "#ffffff" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">City *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.city}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Postal Code *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.postalCode}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Province *</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.province}
                  sx={{ bgcolor: "#fffde7" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Country *</Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={userData.country}
                  sx={{ bgcolor: "#fffde7" }}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInfoForm;
