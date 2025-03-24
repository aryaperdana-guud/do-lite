"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { StatusIcon } from "./StatusRender";
import { formatDate } from "./Utility/formatDate";
import { formatCurrency } from "./Utility/formatCurrency";
import { useParams } from "react-router-dom";

export function ExtensionsTab() {
  const [extensions, setExtensions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/extension/doExt/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&mDataProp_0=tckJobDoExt.tckJob.tckRecordDate.rcdDtPaid&mDataProp_1=tckDo.doId&sSearch_1=${id}&mDataProp_2=history&sSearch_2=all&iColumns=3`;
  useEffect(() => {
    async function fetchExtensions() {
      setLoadingData(true);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        const formattedData =
          responseData.aaData?.map((item) => ({
            id: id,
            validTillDate: formatDate(item.doxValidDate),
            noContainers: item.doxNoCnt || "-",
            currency: item.doxChargesTotal || "-",
            amount: formatCurrency(item.doxChargesTotal),
            submitDate: formatDate(
              item.tckJobDoExt.tckJob.tckRecordDate.rcdDtSubmit
            ),
            issueDate: formatDate(
              item.tckJobDoExt.tckJob.tckRecordDate.rcdDtPaid
            ),
            extendedDO: null,
            proformaInvoice: null,
            platformFeeInvoice: null,
            demurrageFinalInvoice: null,
            adminFeeFinalInvoice: null,
          })) || [];

        setExtensions(formattedData);
        console.log("Full formattedData:", formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setExtensions([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchExtensions();
    }
  }, [token]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Sorting function with custom comparators
  const sortExtensions = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedExtensions = [...extensions].sort((a, b) => {
      // Special handling for status columns
      const statusOrder = { pending: 0, rejected: 1, accepted: 2 };

      if (key.includes("Invoice") || key === "extendedDO") {
        const statusA = statusOrder[a[key]] || 0;
        const statusB = statusOrder[b[key]] || 0;
        return direction === "asc" ? statusA - statusB : statusB - statusA;
      }

      // Default sorting for other columns
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setExtensions(sortedExtensions);
    setSortConfig({ key, direction });
  };

  // Mapping between display headers and object keys
  const headerMapping = {
    "Valid Till Date": "validTillDate",
    "No Containers": "noContainers",
    Currency: "currency",
    Amount: "amount",
    "Submit Date": "submitDate",
    "Issue Date": "issueDate",
    "Extended DO": "extendedDO",
    "Proforma Invoice": "proformaInvoice",
    "Platform Fee Invoice": "platformFeeInvoice",
    "Demurrage Final Invoice": "demurrageFinalInvoice",
    "Admin Fee Final Invoice": "adminFeeFinalInvoice",
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "50vh", // Limit the maximum height
      }}
    >
      {/* Header - Relative Position */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          position: "relative",
          zIndex: 2,
          backgroundColor: "#f5f5f5",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          pb: 2,
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#263754",
          }}
        >
          Extensions
        </Typography>
      </Box>

      {/* Table Container with fixed height and scrollable content */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "none",
          borderRadius: "8px",
          flex: 1,
          overflow: "auto",
          height: "calc(100% - 120px)", // Adjust based on header and footer height
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {Object.keys(headerMapping).map((header) => (
                <TableCell
                  key={header}
                  style={{
                    color: "#455571",
                    fontWeight: 700,
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "8px",
                    whiteSpace: "nowrap",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    cursor:
                      header.includes("Invoice") || header === "Extended DO"
                        ? "default"
                        : "pointer",
                  }}
                  onClick={() => {
                    // Prevent sorting for status columns
                    if (
                      !header.includes("Invoice") &&
                      header !== "Extended DO"
                    ) {
                      sortExtensions(headerMapping[header]);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {header}
                    {sortConfig.key === headerMapping[header] &&
                      !header.includes("Invoice") &&
                      header !== "Extended DO" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {extensions.map((extension) => (
              <TableRow
                key={extension.id}
                hover
                style={{
                  backgroundColor: "white",
                }}
                sx={{
                  height: 40, // Numeric value for height
                  "& > td": {
                    padding: "15px", // Adjust cell padding
                  },
                }}
              >
                <TableCell>{extension.validTillDate}</TableCell>
                <TableCell>{extension.noContainers}</TableCell>
                <TableCell>{extension.currency}</TableCell>
                <TableCell>{extension.amount}</TableCell>
                <TableCell>{extension.submitDate}</TableCell>
                <TableCell>{extension.issueDate}</TableCell>
                <TableCell>
                  <StatusIcon status={extension.extendedDO} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.proformaInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.platformFeeInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.demurrageFinalInvoice} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={extension.adminFeeFinalInvoice} />
                </TableCell>
              </TableRow>
            ))}
            {extensions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={11}
                  align="center"
                  style={{ padding: "20px" }}
                >
                  Sorry, no matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer - Relative Position */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          position: "relative",
          zIndex: 2,
          backgroundColor: "#f5f5f5",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Typography style={{ color: "#455571" }}>
          Total Extensions: {extensions.length} records
        </Typography>

        <IconButton
          size="small"
          style={{
            backgroundColor: "#263754",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <FileDownloadIcon />
        </IconButton>
      </Box>
    </div>
  );
}
