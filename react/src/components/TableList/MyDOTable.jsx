"use client";
import { AlignCenter, Eye } from "lucide-react";
import "./BOLTable.css"; // Reusing the existing CSS
import {
  Typography,
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
import { Title } from "@mui/icons-material";

export const MyDOTable = ({
  data = [],
  loading = false,
  title,
  onViewDetails,
}) => {
  const navigate = useNavigate();

  // Ensure data is properly assigned
  const displayData = Array.isArray(data) && data.length > 0 ? data : [];

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <Typography variant="h5" className="header-title">
          {title}
        </Typography>
      </div>

      <div
        className="active-lists__content"
        style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
      >
        {loading ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "DO Number",
                    "Consignee (Cargo Owner)",
                    "Vessel Name",
                    "Voyage Number",
                    "BL Number",
                    "BL Type",
                    "Number of Containers",
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
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Sorry, no matching records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((row, index) => (
                    <TableRow key={row.id || index} className="table-row">
                      <TableCell>{row.doNumber}</TableCell>
                      <TableCell>{row.consignee}</TableCell>
                      <TableCell>{row.vesselName}</TableCell>
                      <TableCell>{row.voyageNumber}</TableCell>
                      <TableCell>{row.blNumber}</TableCell>
                      <TableCell>{row.blType}</TableCell>
                      <TableCell>{row.numberOfContainers}</TableCell>
                      <TableCell>
                        <div className="action-buttons">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate("/my-do/active/details")}
                            sx={{ color: "#3b82f6" }}
                          >
                            <Eye size={16} />
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
    </div>
  );
};

export default MyDOTable;
