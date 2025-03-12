import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Box from "@mui/joy/Box";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import Button from "@mui/joy/Button";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
//tabs
import DOClaimViewAttachments from "../components/DOClaimViewAttachments.jsx";
import DOClaimViewAudit from "../components/DOClaimViewAudit.jsx";
import DOClaimViewQuery from "../components/DOClaimViewQuery.jsx";
import DOClaimViewClaimDetails from "../components/DOClaimViewClaimDetails.jsx";
import DOExtGenDetails from "./DOExtGenDetails.jsx";
import ViewExtAudit from "./DOExtViewAudit.jsx";

export function DOExtView() {
  const [activeTab, setActiveTab] = useState("general-details");
  const navigate = useNavigate();
  const { mode } = useParams(); // Get mode from URL params
  const isEditMode = mode === "edit";

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving Extension...");
    // Navigate back after saving
    navigate(-1);
  };

  const handleConfirm = () => {
    // Add your delete logic here
    console.log("Confirming Extension...");
    // Navigate back after deleting
    navigate(-1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general-details":
        return <DOExtGenDetails isEditMode={isEditMode} />;
      case "audit":
        return <ViewExtAudit />;
      default:
        return <div>Tab content not available</div>;
    }
  };

  return (
    <div
      className="dashboard"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavigationBar />
      <main
        className="main-content"
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProfileDropdown />

        <h1 className="Title">DO Claims</h1>

        <div
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 60px)",
            overflow: "hidden",
          }}
        >
          <div className="form-title">
            {isEditMode ? "Edit Extend DO Details" : "Extend DO Details"}
          </div>

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
                  value="general-details"
                  sx={{
                    color: activeTab === "claim-details" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "claim-details" ? "#0070c0" : "transparent",
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
                  <DescriptionOutlinedIcon fontSize="small" />
                  General Details
                </Tab>
                <Tab
                  value="audit"
                  sx={{
                    color: activeTab === "attachments" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "attachments" ? "#0070c0" : "transparent",
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
                  <AttachmentOutlinedIcon fontSize="small" />
                  Audit
                </Tab>
              </TabList>
            </Tabs>
          </div>

          {/* Scrollable content container */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "0px",
              marginBottom: "20px",
            }}
          >
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
              gap: 2,
            }}
          >
            <Button
              onClick={() => navigate(-1)}
              sx={{
                backgroundColor: "#6c757d",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a6268",
                },
              }}
            >
              Back
            </Button>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={handleSave}
                sx={{
                  backgroundColor: "white",
                  color: "#0070c0",
                  border: "2px solid #0070c0",
                  "&:hover": {
                    backgroundColor: "##263754",
                    color: "white",
                    border: "none",
                  },
                }}
              >
                Save
              </Button>
              <Button
                onClick={handleConfirm}
                sx={{
                  backgroundColor: "#0070c0",
                  color: "white",
                  width: "160px",
                  "&:hover": {
                    backgroundColor: "#263754",
                  },
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </div>
      </main>
    </div>
  );
}

export default DOExtView;
