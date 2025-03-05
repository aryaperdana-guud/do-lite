import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { FileSearch, LogOut, Clock, Download, Printer} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExtAuditTable from "../components/TableList/ExtAuditTable.jsx";
import "./DOExtAudit.css"
import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const DOExtAudit = () => {
    const { id } = useParams();
    console.log("Current ID:", id);
    const navigate = useNavigate();

    const [auditData, setAuditData] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setAuditData([
          { event: "JOB CREATE EVENT", timestamp: "17/02/2025 17:30:56", remarks: "-", userId: "COMLG_U002", userName: "Adli Ifkar" },
          { event: "JOB CREATE EVENT", timestamp: "17/02/2025 17:30:56", remarks: "-", userId: "COMLG_U002", userName: "Adli Ifkar" },
          { event: "JOB CREATE EVENT", timestamp: "17/02/2025 17:30:56", remarks: "-", userId: "COMLG_U002", userName: "Adli Ifkar" },
          { event: "JOB CREATE EVENT", timestamp: "17/02/2025 17:30:56", remarks: "-", userId: "COMLG_U002", userName: "Adli Ifkar" },
        ]);
      }, []);
  
    return (
      <div className="dashboard_ext_audit">
        <NavigationBar />
        <main className="main-content">
            <ProfileDropdown />
            <h1 className="title"><FileSearch size={40}/> DO Extension Details</h1>
            <div className="detail-container">
                <div className="detail-header">
                    <h2>Extend DO Details</h2>
                    <button className="logout-button" onClick={() => navigate("/do-extension/active")}><LogOut /></button>
                </div>
                <div className="tabs">
                    <button className="tab" onClick={() => navigate(`/edit-do-extension/GenDetails/${id}`)}>GENERAL DETAILS</button>
                    <button className="active-tab">AUDIT</button>
                </div>

                <div style={{backgroundColor: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
                    <h4 style={{textAlign: 'center', fontSize: '20px'}}><Clock size={16}/> Audit</h4>
                    <ExtAuditTable data={auditData} />
                    <div className="table-buttons" style={{ display: 'flex', gap: '10px', padding: '10px'}}>
                        <button className="print-btn" style={{backgroundColor: '#263754', color: 'white', borderRadius: '10px'}}><Printer size={16}/> PRINT</button>
                        <button className="csv-btn" style={{backgroundColor: '#263754', color: 'white', borderRadius: '10px'}}><Download size={16}/> CSV</button>
                    </div>
                </div>
               
                <div className="buttons" style={{display: 'flex', gap: '5px', justifyContent: 'right'}}>
                    <button className="s-btn" style={{backgroundColor: '#263754', color: 'white', height: 'fit-content'}}>SAVE</button>
                    <button className="c-btn" style={{backgroundColor: '#263754', color: 'white', height: 'fit-content'}}>CONFIRM</button>
                </div>
            </div>
        </main>  
      </div>
    );
};
  
export default DOExtAudit;