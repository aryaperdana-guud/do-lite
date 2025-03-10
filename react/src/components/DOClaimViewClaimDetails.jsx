import React, {useState,useEffect} from "react";
import { Ship, CalendarDays, ReceiptText } from "lucide-react";
import SelectedBOL from "./TableList/SelectedBOL";

const formContainer = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    gap: '20px', 
    paddingBottom: '20px', 
    flexWrap: 'nowrap',
}

const form = {
    background: "#eaeaea",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "100%",
    minWidth: "300px",
    gap: "10px",
    flex: "1",
    alignItems: "center",
    boxSizing: "border-box",
}

const labelStyle ={
    fontSize: "18px",
    width: "150px",
    padding: "5px",
    margin: "5px",
    display: "block",
};

const data = {
    background: "#ffffff",
    display: "block",
    width: "90%",
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
}

const chargeDet = {
    background: "#eaeaea",
    padding: "20px",
    paddingBottom: "20px",
    borderRadius: "10px",
    gap: "10px",
    alignItems: "center",
    textAlign: "center",
    marginTop: "20px",
}

const DOClaimViewClaimDetails = () => {

    const [selectedbol, setSelectedbol] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setSelectedbol([
          {
            blNo: "MEDUU12345",
            containerNo: "MSDU1234567890",
            shippingLine: "SHIPPING LINE 1",
            authoriser: "CARGO OWNER 1",
            blDateSubmitted: "10/02/2025 15:51:07",
          },
          {
            blNo: "MEDUU12345",
            containerNo: "MSDU1234567890",
            shippingLine: "SHIPPING LINE 1",
            authoriser: "CARGO OWNER 1",
            blDateSubmitted: "10/02/2025 15:51:07",
          },
        ]);
      }, []);

return (
    <div>
        <div style={formContainer}>
            <div style={form}>
                <h4 style={{ textAlign: "center", fontSize: "20px" }}>
                    <Ship size={16} /> General Details
                </h4>
                <div>
                    <label style={labelStyle}>Job ID</label>
                    <div>
                        <label style={data}>DOJF6576152415172006</label>
                    </div>
                </div>
                <div>
                    <label style={labelStyle}>Shipment Type</label>
                    <div>
                        <label style={data}>IMPORT</label>
                    </div>
                </div>
            </div>
        
            <div style={form}>
                <h4 style={{ textAlign: "center", fontSize: "20px" }}>
                    <CalendarDays size={16} /> Job Date Details
                </h4>
                <div className="form-content">
                    <label style={labelStyle}>Start Date</label>
                    <div>
                        <input style={data} type="date" />
                    </div>
                </div>
                <div>
                    <label style={labelStyle}>Expiry Date</label>
                    <div>
                        <input style={data} type="date" />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <SelectedBOL data={selectedbol} />
        </div>

        <div style={chargeDet}>
            <h4 style={{ textAlign: "center", fontSize: "20px" }}>
            <ReceiptText size={16} /> Charge Details
            </h4>
            <div className="charge-row">
                <label style={labelStyle}>Job Charge</label>
                <div style={data}>Rp 3.000.000</div>
            </div>
        </div>
    </div>
  );
};

export default DOClaimViewClaimDetails;