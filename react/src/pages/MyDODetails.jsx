import React, { useState } from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { TaxInvoiceTab } from "../components/TaxInvoiceTab.jsx";
import "./MyDODetails.css";
import { useNavigate } from "react-router-dom";
import { InvoiceTab } from "../components/InvoiceTab.jsx";
import { ContainersTab } from "../components/ContainersTab.jsx";
import { ExtensionsTab } from "../components/ExtensionTab.jsx";

export function MyDODetails() {
  const [activeTab, setActiveTab] = useState("general-details");

  // Sample data - in a real app, this would come from an API or props
  const doData = {
    doNumber: "DO12345678901234567",
    blNumber: "MEDUU12345",
    blType: "EXPRESS",
    consignee: "CARGO OWNER 1",
    notifyParty: "",
    vesselName: "MSC CORDELLIA III",
    vesselETA: "15/02/2025",
    voyageNumber: "HB225R",
    loadingPort: "FRLEH",
    dischargePort: "DO12345678901234567",
    createdBy: "SYS",
    createdDate: "11/02/2025",
    updatedBy: "SYS",
    updatedDate: "11/02/2025",
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case "extensions":
        return <ExtensionsTab />;
      case "containers":
        return <ContainersTab />;
      case "tax-invoices":
        return <TaxInvoiceTab />;
      case "invoices":
        return <InvoiceTab />;
      case "general-details":
        return (
          <div className="cards-container">
            <div className="left-group">
              {/* General Details Section */}
              <div className="general-details">
                <div
                  className="details-title"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <DescriptionOutlinedIcon />
                  <Typography variant="h5">General Details</Typography>
                </div>

                <div className="details-content">
                  <div>
                    <Typography variant="h6">DO Number</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.doNumber}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Bill of Loading Section */}
              <div className="general-details">
                <div
                  className="details-title"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <DescriptionOutlinedIcon />
                  <Typography variant="h5">Bill of Loading</Typography>
                </div>
                <div className="details-content">
                  <div>
                    <Typography variant="h6">BL Number</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.blNumber}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">BL Type</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.blType}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">BL Document</Typography>
                    <div className="document-actions">
                      <Button
                        variant="outlined"
                        color="neutral"
                        className="browse-button"
                      >
                        BROWSE
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="download-button"
                      >
                        <FileDownloadOutlinedIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Party Details Section */}
              <div className="party-details">
                <div
                  className="details-title"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <PersonOutlineOutlinedIcon />
                  <Typography variant="h5">Party Details</Typography>
                </div>
                <div className="details-content">
                  <div>
                    <Typography variant="h6">Consignee</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.consignee}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Notify Party</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.notifyParty}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="right-group">
              {/* Shipment Details Section */}
              <div className="bl-details">
                <div
                  className="details-title"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <LocalShippingOutlinedIcon />
                  <Typography variant="h5">Shipment Details</Typography>
                </div>
                <div className="details-content">
                  <div>
                    <Typography variant="h6">Vessel Name</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.vesselName}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Vessel ETA</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.vesselETA}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Voyage Number</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.voyageNumber}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Loading Port</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.loadingPort}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Discharge Port</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.dischargePort}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Properties Section */}
              <div className="bl-details properties-section">
                <div
                  className="details-title"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <SettingsOutlinedIcon />
                  <Typography variant="h5">Properties</Typography>
                </div>
                <div className="details-content">
                  <div>
                    <Typography variant="h6">Created By</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.createdBy}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Created Date</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.createdDate}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Updated By</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.updatedBy}
                      readOnly
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Updated Date</Typography>
                    <Input
                      className="BLNumber-field"
                      size="md"
                      value={doData.updatedDate}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab content not available</div>;
    }
  };

  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />

        <h1 className="Title">Bill of Ladings</h1>

        <div className="form">
          <div className="form-title">Do Details</div>

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
                    color:
                      activeTab === "general-details" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "general-details"
                        ? "#0070c0"
                        : "transparent",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  General Details
                </Tab>
                <Tab
                  value="invoices"
                  sx={{
                    color: activeTab === "invoices" ? "white" : "#455571",
                    backgroundColor:
                      activeTab === "invoices" ? "#0070c0" : "transparent",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  Invoices
                </Tab>
                <Tab
                  value="tax-invoices"
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
                  Tax Invoices
                </Tab>
                <Tab
                  value="containers"
                  sx={{
                    color: "#455571",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  Containers
                </Tab>
                <Tab
                  value="extensions"
                  sx={{
                    color: "#455571",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  Extentions
                </Tab>
              </TabList>
            </Tabs>
          </div>

          {renderTabContent()}

          {/* Action Buttons */}

          <Box className="action-buttons">
            <Button
              onClick={() => navigate(-1)}
              className="action-button back-do"
            >
              Back
            </Button>
            <Button
              className="action-button download-do"
              startIcon={<FileDownloadOutlinedIcon />}
            >
              Download DO
            </Button>
            <Button className="action-button extend-do">Extend DO</Button>
          </Box>
        </div>
      </main>
    </div>
  );
}
