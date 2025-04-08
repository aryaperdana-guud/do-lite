import React from "react";
import "./MyDODetails.css";
import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import ProfileDropdown from "../components/ProfileBar/Profile";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function ChangePassword() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />

        <h1 className="Title">Change Password</h1>
        <div className="form">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              p: 1,
            }}
          >
            <Typography
              variant="h5"
              className="form-title"
              sx={{ fontWeight: "bold" }}
            >
              Edit User Profile
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {/* <IconButton
                color="primary"
                title="Save"
                sx={{
                  borderRadius: "4px",
                }}
              >
                <SaveIcon />
              </IconButton>

              <IconButton
                color="warning"
                title="Reset"
                sx={{
                  borderRadius: "4px",
                }}
              >
                <RestartAltIcon />
              </IconButton> */}

              <IconButton
                color="error"
                title="Exit"
                onClick={() => window.history.back()}
                sx={{
                  borderRadius: "4px",
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </Box>
          <ChangePasswordForm />
        </div>
      </main>
    </div>
  );
}
