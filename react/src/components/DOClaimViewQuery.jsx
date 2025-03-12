import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { HelpCircle } from "lucide-react";
import QueryTable from "./TableList/QueryTable";

// Dummy data structure
const dummyQueryData = [
  {
    queryID: "Q12345",
    requester: "xxxxxxxxxxx",
    query: "xxxxxxxx",
    queryDate: "10/03/2025",
    responder: "xxxxxxxxx",
    response: "xxxxxxxx",
    responseDate: "15/03/2025",
  },
  {
    queryID: "Q12345",
    requester: "xxxxxxxxxxx",
    query: "xxxxxxxx",
    queryDate: "10/03/2025",
    responder: "xxxxxxxxx",
    response: "xxxxxxxx",
    responseDate: "15/03/2025",
  },
];

// Custom styles to match myDO details
const cardStyles = {
  root: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    mb: 3,
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
};

const DOClaimViewQuery = () => {
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        setQueryData(dummyQueryData);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Query Card */}
      <Card sx={cardStyles.root}>
        <CardHeader
          sx={cardStyles.header}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HelpCircle size={24} />
              <Typography variant="h5">Queries</Typography>
            </Box>
          }
        />
        <CardContent sx={cardStyles.content}>
          <QueryTable data={queryData} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DOClaimViewQuery;
