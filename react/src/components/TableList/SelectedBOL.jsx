import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  IconButton,
} from "@mui/material";

import {
  FileDownloadOutlined as FileDownloadIcon,
} from "@mui/icons-material"; 

import { ListChecks } from "lucide-react";

// Custom styles to match myDO details
const cardStyles = {
  root: {
    boxShadow: "none",
    borderRadius: "10px",
  },
  header: {
    bgcolor: "#f5f5f5",
    borderBottom: "1px solid #e0e0e0",
    padding: "12px 16px",
  },
  content: {
    bgcolor: "#eaeaea",
    padding: "16px",
  },
  tableContainer: {
    maxHeight: 400,
    boxShadow: "none",
    borderRadius: "8px",
    "& .MuiTableHead-root": {
      bgcolor: "#f5f5f5",
    },
    "& .MuiTableRow-root:nth-of-type(even)": {
      bgcolor: "#f9f9f9",
    },
  },
};

const SelectedBOL = ({ data = [] }) => {
  return (
    <Card sx={cardStyles.root}>
      <CardHeader
        sx={cardStyles.header}
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ListChecks size={24} />
            <Typography variant="h5">Selected BOL</Typography>
          </Box>
        }
      />
      <CardContent sx={cardStyles.content}>
        <TableContainer component={Paper} sx={cardStyles.tableContainer}>
          <Table stickyHeader aria-label="selected BOL table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>BL No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Container No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Shipping Line</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Authoriser</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  BL Date Submitted
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.blNo}</TableCell>
                    <TableCell>{row.containerNo}</TableCell>
                    <TableCell>{row.shippingLine}</TableCell>
                    <TableCell>{row.authoriser}</TableCell>
                    <TableCell>{row.blDateSubmitted}</TableCell>
                    <TableCell>
                      <Tooltip title="Download">
                        <IconButton size="small" color="primary">
                          <FileDownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No BOLs selected
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SelectedBOL;
