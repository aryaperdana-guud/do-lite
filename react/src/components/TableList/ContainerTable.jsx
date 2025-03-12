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

const ContainerTable = ({
  containerData = [],
  onSelectionChange = () => {},
  onDangerousGoodToggle = () => {},
}) => {
  const [selectedContainers, setSelectedContainers] = useState({});
  const [allSelected, setAllSelected] = useState(false);

  // Handle selection of individual container
  const handleContainerSelect = (index) => {
    const updatedSelection = { ...selectedContainers };
    updatedSelection[index] = !updatedSelection[index];
    setSelectedContainers(updatedSelection);

    // Check if all containers are selected
    const allChecked =
      Object.keys(updatedSelection).length === containerData.length &&
      Object.values(updatedSelection).every((value) => value === true);
    setAllSelected(allChecked);

    // Send selection data to parent
    onSelectionChange(updatedSelection);
  };

  // Handle selection of all containers
  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    const newSelectedContainers = {};

    containerData.forEach((_, index) => {
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

  // Initialize selected containers when data changes
  useEffect(() => {
    if (containerData.length > 0) {
      const initialSelectedState = {};
      containerData.forEach((_, index) => {
        initialSelectedState[index] = false;
      });
      setSelectedContainers(initialSelectedState);
      setAllSelected(false);
    }
  }, [containerData]);

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
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                </TableCell>
                <TableCell>Marks And Number</TableCell>
                <TableCell>Container Cat</TableCell>
                <TableCell>Dangerous Good</TableCell>
                <TableCell>VTD</TableCell>
                <TableCell>Next VTD</TableCell>
                <TableCell>Ext Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {containerData.map((row, index) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ContainerTable;
