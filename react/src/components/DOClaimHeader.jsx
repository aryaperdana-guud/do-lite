import React from "react";
import { Save, Trash2, LogOut } from "lucide-react";
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


const DOClaimHeader = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div>
        <div style={header}>
            <h2 style={{marginTop: '5px'}}>ClicDO CLAIM</h2>
            <div className="edit-actions">
                <button
                style={{...actionButton, color: "green" }}
                onClick={() => console.log("Save clicked")}
                >
                    <Save size={16} />
                </button>

                <button
                style={{...actionButton, color: "red" }}
                onClick={() => console.log("Delete clicked")}
                >
                    <Trash2 size={16} />
                </button>

                <button
                    style={{...actionButton, color: "orange" }}
                    onClick={() => navigate("/do-claims/active")}
                >
                    <LogOut size={16} />
                </button>
            </div>
        </div>

        <div style={tabMenu}>
            <button style={tabActive}>CLAIM DETAILS</button>
            <button
                style={tab}
                onClick={() => navigate(`/do-claim-view-att/${id}`)}
                >
                ATTACHMENTS
            </button>
            <button
                style={tab}
                onClick={() => navigate(`/do-claim-view-query/${id}`)}
                >
                QUERY
            </button>
            <button
                style={tab}
                onClick={() => navigate(`/do-claim-view-audit/${id}`)}
                >
                AUDIT
            </button>
        </div>
    </div>
  );
};

export default DOClaimHeader;
