import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
}

const actionButton = {
    background: "none",
    border: "none",
    outline: "none",
}

const tabMenu = {
    display: "flex",
    gap: "60px",
    paddingBottom: "20px",
}

const tabActive = {
    color: "#ffffff",
    backgroundColor: "#0070c0",
    width: "180px",
}

const tab = {
    color: "#ffffff",
    backgroundColor: "#a0aec0",
    width: "180px",
}

const ViewExtHeader = ({ id }) => {
    const navigate = useNavigate();
  
    return (
        <div>
            <div style={header}>
                <h2 style={{marginTop: '5px'}}>Extend DO Details</h2>
                <div className="edit-actions">
                    <button 
                        style={{...actionButton, color: "orange" }}
                        onClick={() => navigate("/do-extension/active")}>
                            <LogOut />
                    </button>
                </div>     
            </div>
            <div style={tabMenu}>
                <button style={tabActive}
                    onClick={() => navigate(`/view-do-extension/GenDetails/${id}`)}>
                        GENERAL DETAILS
                </button>
                <button style={tab} 
                    onClick={() => navigate(`/view-do-extension/Audit/${id}`)}>
                        AUDIT
                </button>
            </div>
        </div>
    );
};
  
export default ViewExtHeader;
  

