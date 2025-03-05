import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { Pencil, Save, Trash2, LogOut, Printer, Download , Clock} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditDOClaimAudit.css"
import ExtAuditTable from "../components/TableList/ExtAuditTable.jsx";
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const EditDOClaimAudit = () => {
    const { id } = useParams();
    console.log("EditDOClaimAudit ID:", id);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [isConfirmed,setIsConfirmed] = useState(false);

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

    useEffect(() => {
        //check confirmed status di local storage
        const confirmedStatus = localStorage.getItem(`confirmed-${id}`);
        if (confirmedStatus === "true") {
            setIsConfirmed(true);
        }
    }, [id]);
  
    return (
        <div className="dashboard_a">
            <NavigationBar />
            <main className="main-content">
                <ProfileDropdown />
                <h1 className="title"><Pencil size={40}/>  Edit DO</h1>
                <div className="edit-do-container">
                    <div className="edit-header">
                        <h2 className="edit-title">EDIT ClicDO CLAIM</h2>
                        <div className="edit-actions">
                            <button className="action-button-save" onClick={() => console.log("Save clicked")}>
                                <Save size={16} /> 
                            </button>

                            <button className="action-button-delete" onClick={() => console.log("Delete clicked")}>
                                <Trash2 size={16} /> 
                            </button>

                            <button className="action-button-exit" onClick={() => navigate("/do-claims/active")}>
                                <LogOut size={16} /> 
                            </button>
                        </div>
                    </div>
                    <div className="tab-menu">
                        <button className="tab" onClick={() => navigate(`/edit-do-claim/${id}`)}>CLAIM DETAILS</button>
                        <button className="tab" onClick={() => navigate(`/edit-do-claim-attachments/${id}`)}>ATTACHMENTS</button>
                        <button className="tab" onClick={() => navigate(`/edit-do-claim-query/${id}`)}>QUERY</button>
                        <button className="tab-active">AUDIT</button>
                    </div>

                    <div style={{backgroundColor: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
                        <h4 style={{textAlign: 'center', fontSize: '20px'}}><Clock size={16}/> Audit</h4>
                        <ExtAuditTable data={auditData} /> 

                        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px' }}>
                            {isConfirmed && (
                                <div className="confirmed" style={{textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#6B8E23', display: 'flex', alignItems: 'center'}}>
                                    CONFIRMED
                                </div>
                            )}

                            <div className="table-buttons" style={{ display: 'flex', gap: '10px'}}>
                                <button className="print-btn" style={{backgroundColor: '#263754', color: 'white', borderRadius: '10px'}}><Printer size={16}/> PRINT</button>
                                <button className="csv-btn" style={{backgroundColor: '#263754', color: 'white', borderRadius: '10px'}}><Download size={16}/> CSV</button>
                            </div>
                        </div>
                        
                    </div>     
                </div>
            </main>  
        </div>
    );
};
  
export default EditDOClaimAudit;