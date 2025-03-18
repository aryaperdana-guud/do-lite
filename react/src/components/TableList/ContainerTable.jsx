import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { Container } from "lucide-react";
import { useParams } from "react-router-dom";
import { formatDate } from "../Utility/formatDate";

const ContainerTable = ({
  onSelectionChange = () => {},
  onDangerousGoodToggle = () => {},
}) => {
  const [selectedContainers, setSelectedContainers] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/extension/doExtCnt/${id}/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&mDataProp_0=doxcId&iColumns=1`;

  // Handle selection of individual container
  const handleContainerSelect = (index) => {
    const updatedSelection = { ...selectedContainers };
    updatedSelection[index] = !updatedSelection[index];
    setSelectedContainers(updatedSelection);

    // Check if all containers are selected
    const allChecked =
      Object.keys(updatedSelection).length === tableData.length &&
      Object.values(updatedSelection).every((value) => value === true);
    setAllSelected(allChecked);

    // Send selection data to parent
    onSelectionChange(updatedSelection);
  };

  // Handle selection of all containers
  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    const newSelectedContainers = {};

    tableData.forEach((_, index) => {
      newSelectedContainers[index] = newAllSelected;
    });

    setAllSelected(newAllSelected);
    setSelectedContainers(newSelectedContainers);

    // Send selection data to parent
    onSelectionChange(newSelectedContainers);
  };

  // Handle dangerous good toggle
  const handleDangerousGoodToggle = (index) => {
    onDangerousGoodToggle(index);
  };

  useEffect(() => {
    async function fetchTableData() {
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
            marksAndNumber: `${item.tckCnt.cntNo || "N/A"}-${item.tckCnt.cntSize || "N/A"}`,
            containerCat: item.tckDoExtMstCntCategory.ccName || "N/A",
            dangerousGood: item.tckCnt.cntDangerousGood || "N/A",
            vtd: formatDate(item.tckCnt.cntValidDate) || "N/A",
            nextvtd: formatDate(item.tckCnt.cntDoLastPaidThru) || "N/A",
            extDays: item.tckDoExt.doxNoDays || "N/A",
          })) || [];

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTableData([]);
      } finally {
        setLoadingData(false);
      }
    }

    if (token) {
      fetchTableData();
    }
  }, [token, apiUrl]);

  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: "#f5f5f5",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "none",
      }}
    >
      <CardHeader
        sx={{
          bgcolor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          p: 2,
        }}
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Container size={18} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Containers for Extension
            </Typography>
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", maxHeight: "157px", overflowY: "auto" }}
        >
          <Table
            size="small"
            sx={{ "& td, & th": { padding: "4px", fontSize: "14px" } }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ bgcolor: "#f5f5f5" }}>
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Marks and Number
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Container Category
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Dangerous Good
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Valid Till Date
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Next Valid Till Date
                </TableCell>
                <TableCell sx={{ bgcolor: "#f5f5f5" }}>
                  Extension Days
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingData ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading data...
                  </TableCell>
                </TableRow>
              ) : tableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No container data available
                  </TableCell>
                </TableRow>
              ) : (
                tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedContainers[index] || false}
                        onChange={() => handleContainerSelect(index)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{row.marksAndNumber}</TableCell>
                    <TableCell>{row.containerCat}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {row.dangerousGood}
                        <Checkbox
                          checked={row.dangerousGood === "YES"}
                          onChange={() => handleDangerousGoodToggle(index)}
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{row.vtd}</TableCell>
                    <TableCell>{row.nextvtd}</TableCell>
                    <TableCell>{row.extDays}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ContainerTable;
