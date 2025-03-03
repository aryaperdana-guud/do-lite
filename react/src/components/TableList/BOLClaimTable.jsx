"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import "./BOLTable.css";
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BOLClaim = ({
  data = [],
  loading = false,
  onClaim,
  onDownloadItem,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const displayData = data.length > 0 ? data : [];

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderStatus = (status) => {
    if (status === "NEW") {
      return (
        <div
          style={{
            backgroundColor: "#4ade80",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {status}
        </div>
      );
    }
    return status;
  };

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <Typography variant="h5" className="header-title">
          Claiming Bill of Ladings
        </Typography>
      </div>

      <div className="active-lists__content">
        {loading ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "BL No.",
                    "Container No.",
                    "Shipping Line",
                    "State",
                    "Action",
                  ].map((header) => (
                    <TableCell key={header} className="table-header">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="no-records">
                      Sorry, no matching records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((row, index) => (
                    <TableRow key={row.id || index} className="table-row">
                      <TableCell>{row.blNo}</TableCell>
                      <TableCell>{row.containerNo}</TableCell>
                      <TableCell>{row.shippingLine}</TableCell>
                      <TableCell>{renderStatus(row.state)}</TableCell>
                      <TableCell>
                        <div className="action-buttons">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleSelectItem(row.id)}
                          >
                            <X size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onDownloadItem?.(row)}
                          >
                            <Download size={16} />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <div
        className="active-lists__footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1e3a5f",
              color: "white",
              fontWeight: "bold",
              width: "130px",
              "&:hover": {
                backgroundColor: "#152a43",
              },
            }}
            onClick={onClaim}
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BOLClaim;
