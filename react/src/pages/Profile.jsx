import React, { useState } from "react";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import "./MyDODetails.css";
import UserInfoForm from "./Profile-UserDetails.jsx";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import UserActivityLog from "./Profile-Audits.jsx";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("user-details");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "user-details":
        return <UserInfoForm />;
      case "roles":
        return <div style={{ color: "#000" }}>Tab content not available</div>;
      case "audits":
        return <UserActivityLog />;
      default:
        return <div style={{ color: "#000" }}>Tab content not available</div>;
    }
  };

  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />

        <h1 className="Title">User Profile</h1>

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
              <IconButton
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
              </IconButton>

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

          {/* Navigation Tabs */}
          <div style={{ marginBottom: "20px" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                padding: "4px",
              }}
            >
              <TabList
                sx={{
                  gap: "4px",
                  display: "flex",
                  overflowX: "auto",
                  padding: "0",
                  minHeight: "40px",
                }}
              >
                <Tab
                  value="user-details"
                  sx={{
                    color: activeTab === "user-details" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "user-details" ? "#0070c0" : "transparent",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  User Details
                </Tab>
                <Tab
                  value="roles"
                  sx={{
                    color: activeTab === "roles" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "roles" ? "#0070c0" : "transparent",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  Roles
                </Tab>
                <Tab
                  value="audits"
                  sx={{
                    color: "#455571",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Audits
                </Tab>
              </TabList>
            </Tabs>
          </div>
          <div style={{ overflow: "auto", padding: 0 }}>
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
