import React, {useState,useEffect} from "react";
import AuditTable from "./TableList/AuditTable";
import { Download, Printer } from "lucide-react";

const buttons = {
    display: 'flex', 
    gap: '10px',
    paddingTop: '20px',
}

const button = {
    backgroundColor: '#263754', 
    color: 'white', 
    borderRadius: '10px',
}
const DOClaimViewAudit = () => {

    const [auditdata, setAuditdata] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setAuditdata([
          {
            event: "DO CLAIM JOB MODIFY",
            timestamp: "12/02/2025 15:09:38",
            remarks: "MODIFY",
            userID: "COMLG_U002",
            username: "ABCDEFG",
          },
          {
            event: "DO CLAIM JOB MODIFY",
            timestamp: "12/02/2025 15:09:38",
            remarks: "MODIFY",
            userID: "COMLG_U002",
            username: "ABCDEFG",
          },
        ]);
      }, []);

return (
    <div>
        <div>
            <AuditTable data={auditdata} />
        </div>
        <div style={buttons}>
            <button style={button}> <Printer size={16}/> PRINT</button>
            <button style={button}> <Download size={16}/> CSV</button>
        </div>
    </div>
  );
};

export default DOClaimViewAudit;