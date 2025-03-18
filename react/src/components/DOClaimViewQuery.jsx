import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { HelpCircle } from "lucide-react";
import QueryTable from "./TableList/QueryTable";
import { formatDate } from "./Utility/formatDate";
import useSessionStore from "../SessionControl/SessionStore";

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
  const token = localStorage.getItem("jwtToken");
  const idQuery = useSessionStore((state) => state.idQuery);
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/query/job/list/${idQuery}`;

  useEffect(() => {
    if (!token) return;

    async function fetchQueryData() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const formattedData = Array.isArray(responseData)
          ? responseData.map((query) => ({
              queryID: query.qryId || "-",
              requester: query.tcoreUsrByQryRequester?.usrName || "Unknown",
              query: query.qryQuery || "-",
              queryDate: query.qryDtQuery ? formatDate(query.qryDtQuery) : "-",
              //
              responder: query.tcoreUsrByQryResponder?.usrName || "-",
              response: query.qryResponse || "-",
              responseDate: query.qryDtResponse
                ? formatDate(query.qryDtResponse)
                : "-",
            }))
          : [];

        setQueryData(formattedData);
      } catch (error) {
        console.error("Error fetching query data:", error);
      }
    }

    fetchQueryData();
  }, [token]);

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
