import React, {useState,useEffect} from "react";
import QueryTable from "./TableList/QueryTable";

const DOClaimViewQuery = () => {

    const [querydata, setQuerydata] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setQuerydata([
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
        ]);
      }, []);

return (
    <div>
        <div>
            <QueryTable data={querydata} />
        </div>
    </div>
  );
};

export default DOClaimViewQuery;