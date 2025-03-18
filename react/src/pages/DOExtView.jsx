import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
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
  const { title } = useParams();

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleConfirmClick = () => {
    setShowConfirmPopup(true);
  };

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

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
        return <DOExtGenDetails title={title} />;
      case "audit":
        return <ViewExtAudit title={title} />;
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

        <h1 className="Title">DO Extension</h1>

        <div
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 60px)",
            overflow: "hidden",
          }}
        >
          <div className="form-title">Edit Extend DO Details</div>

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
            {title !== "History List" && (
              <Box sx={{ display: "flex", gap: 2, focusfisible: "none" }}>
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
                  onClick={handleConfirmClick}
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
            )}

            {/* Confirmation Dialog */}
            <Dialog
              open={showConfirmPopup}
              onClose={handleCloseConfirmPopup}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle 
                sx={{ 
                  bgcolor: "#263754", 
                  textAlign: "center", 
                  color: "white"
                }}>
                  <Box
                    sx={{
                      alignItems: "center",
                      gap: 1.5,
                      color: "white",
                    }}>
                    <Typography variant="h5"
                      sx={{
                        color: "white !important",
                      }}>
                      CONFIRMATION
                    </Typography>
                  </Box>
              </DialogTitle>
              <DialogContent sx={{ pt: 2 }}>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 1, mt: 2 }}>
                  Are you sure want to confirm?
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
                  Extensions Job cannot be deleted or changed after confirmed
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ bgcolor: "#f8f8f8", p: 2, borderRadius: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "red", textAlign: "center" }}
                  >
                    DO submissions will be processed for the DO request on{" "}
                    <strong>8:30 AM until 4:30 PM</strong>. Late submissions
                    will be handled the next working day. Please ensure your
                    documents are complete and meet the requirements.
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ pb: 3, px: 3, justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseConfirmPopup}
                  sx={{ px: 4, color: "red", borderColor: "red", "&:hover": { bgcolor: "red", color: "white", borderColor: "red" } }}
                >
                  NO
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    alert("Confirmed!");
                    handleCloseConfirmPopup();
                  }}
                  sx={{ px: 4, color: "green", "&:hover": { bgcolor: "darkgreen", color: "white" } }}
                >
                  YES
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </main>
    </div>
  );
}

export default DOExtView;
