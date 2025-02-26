import React from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Box from "@mui/joy/Box";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewBL.css";

export function ViewBL() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {}; // Get row data or default to an empty object

  // Handle missing data
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="dashboard">
        <NavigationBar />
        <main className="main-content">
          <h1 className="Title">Bill of Ladings</h1>
          <div className="form">
            <div className="form-title">View BL</div>
            <Typography variant="h6" color="error">
              Error: No data available. Please select a BL from the table.
            </Typography>
            <Box className="submit-button">
              <button onClick={() => navigate(-1)} className="back-button">
                Go Back
              </button>
            </Box>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">Bill of Ladings</h1>
        <div className="form">
          <div className="form-title">
            View BL <Typography>ID : {data.id || "-"}</Typography>
          </div>

          <div className="cards-container">
            <div className="left-group">
              {/* General Details Section */}
              <div className="general-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">
                    General Details
                  </Typography>
                </div>
                <div className="details-content">
                  <Typography variant="h6">Shipping Line:</Typography>
                  <div className="read-only-field">
                    <Typography>{data.shippingLine || "-"}</Typography>
                  </div>
                  <Typography variant="h6">Remarks:</Typography>
                  <div className="read-only-field">
                    <Typography>{data.remarks || "-"}</Typography>
                  </div>
                </div>
              </div>
              {/* Party Details Section */}
              <div className="party-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">
                    Party Details
                  </Typography>
                </div>
                <div className="details-content">
                  <Typography variant="h6">Cargo Owner:</Typography>
                  <div className="read-only-field">
                    <Typography>{data.cargoOwner || "-"}</Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-group">
              {/* BL Details Section */}
              <div className="bl-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">
                    BL Details
                  </Typography>
                </div>
                <div className="details-content">
                  <Typography variant="h6">BL Number:</Typography>
                  <div className="read-only-field">
                    <Typography>{data.blNo || "-"}</Typography>
                  </div>
                  <Typography variant="h6">Container Number:</Typography>
                  <div className="read-only-field">
                    <Typography>{data.containerNo || "-"}</Typography>
                  </div>

                  <Typography variant="h6">BL File:</Typography>

                  {data.blFile ? (
                    <a
                      href={data.blFile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  ) : (
                    <Typography>-</Typography>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Box
            className="submit-button"
            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
          >
            <Typography variant="body1" fontWeight="bold">
              This is a read-only view.
            </Typography>
            <button onClick={() => navigate(-1)} className="back-button">
              Go Back
            </button>
            <button onClick={() => navigate()} className="claim-button">
              Claims
            </button>
          </Box>
        </div>
      </main>
    </div>
  );
}
