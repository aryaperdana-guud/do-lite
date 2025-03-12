import React, { useState } from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Box from "@mui/joy/Box";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import Button from "@mui/joy/Button";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useNavigate } from "react-router-dom";
//tabs
import DOClaimViewAttachments from "../components/DOClaimViewAttachments.jsx";
import DOClaimViewAudit from "../components/DOClaimViewAudit.jsx";
import DOClaimViewQuery from "../components/DOClaimViewQuery.jsx";
import DOClaimViewClaimDetails from "../components/DOClaimViewClaimDetails.jsx";

// Import your tab components

export function DOClaimView() {
  const [activeTab, setActiveTab] = useState("claim-details");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "claim-details":
        return <DOClaimViewClaimDetails />;
      case "attachments":
        return <DOClaimViewAttachments />;
      case "audit":
        return <DOClaimViewAudit />;
      case "query":
        return <DOClaimViewQuery />;
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
            height: "calc(100% - 60px)" /* Adjust based on your title height */,
            overflow: "hidden",
          }}
        >
          <div className="form-title">DO Claim Details</div>

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
                  value="claim-details"
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
                  Claim Details
                </Tab>
                <Tab
                  value="attachments"
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
                  Attachments
                </Tab>
                <Tab
                  value="audit"
                  sx={{
                    color: activeTab === "audit" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "audit" ? "#0070c0" : "transparent",
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
                  <AssessmentOutlinedIcon fontSize="small" />
                  Audit
                </Tab>
                <Tab
                  value="query"
                  sx={{
                    color: activeTab === "query" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "query" ? "#0070c0" : "transparent",
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
                  <HelpOutlineOutlinedIcon fontSize="small" />
                  Query
                </Tab>
              </TabList>
            </Tabs>
          </div>

          {/* Scrollable content container */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "10px",
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
          </Box>
        </div>
      </main>
    </div>
  );
}

export default DOClaimView;
