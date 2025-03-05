import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { Ship, CalendarDays, MousePointer, ReceiptText, Pencil, Save, Trash2, LogOut, X, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditDOClaim.css"
import SelectedBOL from "../components/TableList/SelectedBOL.jsx";
import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const EditDOClaim = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedbol, setSelectedbol] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setSelectedbol([
            {blNo: "MEDUU12345",
                containerNo: "MSDU1234567890",
                shippingLine: "SHIPPING LINE 1",
                authoriser: "CARGO OWNER 1",
                blDateSubmitted: "10/02/2025 15:51:07"
            },
            {blNo: "MEDUU12345",
                containerNo: "MSDU1234567890",
                shippingLine: "SHIPPING LINE 1",
                authoriser: "CARGO OWNER 1",
                blDateSubmitted: "10/02/2025 15:51:07"
            },
        ]);
      }, []);
  
    return (
      <div className="dashboard_claim">
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
                    <button className="tab-active">CLAIM DETAILS</button>
                    <button className="tab" onClick={() => navigate(`/edit-do-claim-attachments/${id}`)}>ATTACHMENTS</button>
                    <button className="tab" onClick={() => navigate(`/edit-do-claim-query/${id}`)}>QUERY</button>
                    <button className="tab" onClick={() => navigate(`/edit-do-claim-audit/${id}`)}>AUDIT</button>
                </div>

                <div className="edit-do-form">
                    <div className="form-group-1">
                        <h4 className="form-title"><Ship size={16}/> General Details</h4>
                        <div>
                            <label>Job ID</label>
                            <div>
                                <input type="text" placeholder="Enter Job ID" />
                            </div>
                        </div>
                        <div>
                            <label>Shipment Type</label>
                            <div>
                                <input type="text" placeholder="Enter Shipment Type" />
                            </div>
                        </div>
                    </div>
            
                    <div className="form-group-2">
                        <h4 className="form-title"><CalendarDays size={16}/> Job Date Details</h4>
                        <div className="form-content">
                            <label>Start Date</label>
                            <div>
                                <input type="date" />
                            </div>
                        </div>
                        <div>
                            <label>Expiry Date</label>
                            <div>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <SelectedBOL data={selectedbol} />
                </div>                

                <div className="charge-details">
                    <h4 className="form-title"><ReceiptText size={16}/> Charge Details</h4>
                    <div className="charge-row">
                        <label>Job Charge</label>
                        <div className="charge-amount">
                            Rp 3.000.000
                        </div>
                    </div>                        
                </div>

            </div>
        </main>  
      </div>
    );
};
  
export default EditDOClaim;