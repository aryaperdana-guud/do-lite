import React, {useState, useEffect} from "react";
import { Ship, CalendarPlus2, Container, ReceiptText } from "lucide-react";
import ContainerTable from "./TableList/ContainerTable";

const ViewExtGenDetails = ({ id }) => {
    console.log("Current ID:", id);
    const DateComponent = ({ date }) => {
        return <p>{new Date(date).toLocaleDateString("id-ID")}</p>;
    }; //date hari ini

    const [containerData, setContainerData] = useState([]);

    useEffect(() => {
        setContainerData([
            { marksAndNumber: "MSDU760099 / 45DV", 
            containerCat: "STANDARD", 
            dangerousGood: "YES", 
            vtd: "20/02/2025",
            nextvtd: "20/03/2025", 
            extDays: "30" },
            { marksAndNumber: "MSDU760099 / 45DV", 
            containerCat: "STANDARD", 
            dangerousGood: "YES", 
            vtd: "20/02/2025", 
            nextvtd: "20/03/2025", 
            extDays: "30" }, 
            { marksAndNumber: "MSDU760099 / 45DV", 
            containerCat: "STANDARD", 
            dangerousGood: "YES", 
            vtd: "20/02/2025",
            nextvtd: "20/03/2025", 
            extDays: "30" },
            { marksAndNumber: "MSDU760099 / 45DV", 
            containerCat: "STANDARD", 
            dangerousGood: "YES", 
            vtd: "20/02/2025", 
            nextvtd: "20/03/2025", 
            extDays: "30" }, 
            
        ]);
    }, []);

    const formContainer = { 
        display: 'flex', 
        justifyContent: 'space-between', 
        gap: '20px', 
        paddingBottom: '20px', 
        flexWrap: 'nowrap',
    }

    const rightside = {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "100%",
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
        overflow: "auto",
    }

    const chargeDet = {
        background: "#eaeaea",
        padding: "5px",
        borderRadius: "10px",
        maxWidth: "100%",
        minWidth: "700px",
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

    const fees = {
        display: "flex",
        gap: "20%",
        justifyContent: "center",
    }

    const chargeData = {
        display: "flex",
        padding: "5px",
        flexDirection: "column",
        width: "450px",
        minWidth: "100px",
        gap: "5px",
    }

    return (
        <div>
            <div style={formContainer}>
                <div style={form}>
                    <h4 style={{ textAlign: 'center', fontSize: '20px' }}>
                        <Ship size={16} /> General Details
                    </h4>
                    <div>
                        <label style={labelStyle}>Ext Job Number</label>
                        <div style={data}>CKJOB241218183084</div>
                    </div>
                    <div>
                        <label style={labelStyle}>DO Number</label>
                        <div style={data}>DO010122035TES</div>
                    </div>
                    <div>
                        <label style={labelStyle}>DO Ex Number</label>
                        <div style={data}>DO010122035TES</div>
                    </div>
                    <div>
                        <label style={labelStyle}>Valid Till Date</label>
                        <div style={data}>
                            <DateComponent date="2025-03-03" />
                        </div>
                    </div>
                </div>

                <div style={rightside}>
                    <div style={form}>
                        <h4 style={{ textAlign: 'center', fontSize: '20px' }}>
                            <CalendarPlus2 size={16} /> Extension Details
                        </h4>
                        <div>
                            <label className="label">No of Container</label>
                            <div className="data">2</div>
                        </div>
                    </div>

                    <div style={form}>
                        <h4 style={{ textAlign: 'center', fontSize: '20px' }}>
                            <Container size={16} /> Containers for Extension
                        </h4>
                        <div>
                            <ContainerTable data={containerData} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={chargeDet}>
                <h4 style={{ textAlign: 'center', fontSize: '20px' }}>
                    <ReceiptText size={16} /> Extension Charge
                </h4>
                <div style={fees}>
                    <div style={chargeData}>
                        <div>
                            <label style={labelStyle}>Admin Fee</label>
                            <div style={data}>Rp 20.000,-</div>
                        </div>
                        <div>
                            <label style={labelStyle}>Platform Fee</label>
                            <div style={data}>Rp 75.000,-</div>
                        </div>
                    </div>
                    <div style={chargeData}>
                        <div>
                            <label style={labelStyle}>Demurrage</label>
                            <div style={data}>Rp 1.254.720.000,-</div>
                        </div>
                        <div>
                            <label style={labelStyle}>Total Charges</label>
                            <div style={data}>Rp 1.254.815.000,-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewExtGenDetails;
