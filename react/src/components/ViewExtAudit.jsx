import React, {useState, useEffect} from "react";
import { Clock, Printer, Download } from "lucide-react";
import ExtAuditTable from "../components/TableList/ExtAuditTable.jsx";

const ViewExtAudit = ({ id }) => {
    console.log("Current ID:", id);

    const [auditData, setAuditData] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setAuditData([
          { event: "JOB CREATE EVENT", timestamp: "17/02/2025 17:30:56", remarks: "-", userId: "COMLG_U002", userName: "Adli Ifkar" },
          { event: "CK_DO_EXT_CREATE", timestamp: "17/02/2025 17:30:56", remarks: "CREATE", userId: "COMLG_U002", userName: "Adli Ifkar" },
          { event: "CK_DO_EXT_MODIFY", timestamp: "17/02/2025 17:30:56", remarks: "MODIFY", userId: "COMLG_U001", userName: "Adli Ifkar" },
          { event: "CK_DO_EXT_MODIFY", timestamp: "17/02/2025 17:30:56", remarks: "MODIFY", userId: "COMLG_U001", userName: "Adli Ifkar" },
        ]);
    }, []);

    const container = {
        backgroundColor: '#eaeaea', 
        padding: '20px', 
        borderRadius: '10px', 
        textAlign: 'center', 
        paddingBottom: '20px',
    }

    const tableButtons = { 
        display: 'flex', 
        gap: '10px', 
        padding: '10px',
    }

    const button = {
        backgroundColor: '#263754', 
        color: 'white', 
        borderRadius: '10px',
    }

    return (
        <div>
            <div style={container}>
                <h4 style={{textAlign: 'center', fontSize: '20px'}}><Clock size={16}/> Audit</h4>
                <ExtAuditTable data={auditData} />
                <div style={tableButtons}>
                    <button style={button}><Printer size={16}/> PRINT</button>
                    <button style={button}><Download size={16}/> CSV</button>
                </div>
            </div>
           
            <div style={{...tableButtons, justifyContent: 'right'}}>
                <button style={{...button, height: 'fit-content'}}>SAVE</button>
                <button style={{...button, height: 'fit-content'}}>CONFIRM</button>
            </div>
        </div>
    );
};

export default ViewExtAudit;
