import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { FileSearch, LogOut,Ship, CalendarPlus2, Container, ReceiptText} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DOExtGenDetails.css"
import ContainerTable from "../components/TableList/ContainerTable.jsx";
import React , {useState, useEffect} from "react"
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const DOExtGenDetails = ({ id }) => {
    console.log("Current ID:", id);
    const navigate = useNavigate();

    const DateComponent = ({ date }) => {
        return <p>{new Date(date).toLocaleDateString("id-ID")}</p>;
    }; //date hari ini

    const [containerData, setContainerData] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const handleConfirmClick = () => {
        setShowConfirmPopup(true); //confirm pop-up
    }

    const handleCloseConfirmPopup = () => {
        setShowConfirmPopup(false); //close confirm
    }

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
  
    return (
      <div className="dashboard_ext_genDet">
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
                    <button className="active-tab">GENERAL DETAILS</button>
                    <button className="tab" onClick={() => navigate(`/edit-do-extension/Audit/${id}`)}>AUDIT</button>
                </div>
                <div className="ext-form">
                    <div className="gen-details">
                        <h4 style={{textAlign: 'center', fontSize: '20px'}}><Ship size={16}/> General Details</h4>
                        <div>
                            <label className="label">Ext Job Number</label>
                            <div className="data">
                                CKJOB241218183084	
                            </div>
                        </div>
                        <div>
                            <label className="label">DO Number</label>
                            <div className="data">
                                DO010122035TES
                            </div>
                        </div>
                        <div>
                            <label className="label">DO Ex Number</label>
                            <div className="data">
                                DO010122035TES
                            </div>
                        </div>
                        <div>
                            <label className="label">Valid Till Date</label>
                            <div className="data">
                                <DateComponent date="2025-03-03" />
                            </div>
                        </div>
                    </div>

                    <div className="right-form">
                        <div className="ext-det">
                            <h4 style={{textAlign: 'center', fontSize: '20px'}}><CalendarPlus2 size={16}/> Extension Details</h4>
                            <div>
                                <label className="label">No of Container</label>
                                <div className="data">2</div>
                            </div>
                        </div>

                        <div className="con4ext">
                            <h4 style={{textAlign: 'center', fontSize: '20px'}}> <Container size={16}/> Containers for Extension</h4>
                            <div>
                                <ContainerTable data={containerData} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="charge-det">
                    <h4 style={{textAlign: 'center', fontSize: '20px'}}><ReceiptText size={16} /> Extension Charge</h4>
                    <div className="newVTD">
                        <label>New Valid Till Date</label><span className="required">*</span>
                        <div>
                            <input type="date" />
                            <button className="calc">CALCULATE</button>
                        </div>
                    </div>
                    <div className="fees">
                        <div className="leftside">
                            <div>
                                <label className="label">Admin Fee</label>
                                <div className="data-chrg">Rp 20.000,-</div>
                            </div>
                            <div>
                                <label className="label">Platform Fee</label>
                                <div className="data-chrg">Rp 75.000,-</div>
                            </div>
                        </div>
                        <div className="rightside">
                            <div>
                                <label className="label">Demurrage</label>
                                <div className="data-chrg">Rp 1.254.720.000,-</div>
                            </div>
                            <div>
                                <label className="label">Total Charges</label>
                                <div className="data-chrg">Rp 1.254.815.000,-</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="s-btn">SAVE</button>
                    <button className="c-btn" onClick={handleConfirmClick}>CONFIRM</button>
                </div>
            </div>
        </main>  

        {showConfirmPopup && (
                <div className="conf-popup-overlay">
                    <div className="conf-popup-content">
                        <h2 className="conf-popup-title">CONFIRMATION</h2>
                        <p>Are you sure want to ?</p>
                        <p>Extensions Job cannot be delete or change after confirmed</p>

                        <div className="conf-popup-buttons">
                            <button className="no-button" onClick={handleCloseConfirmPopup}>NO</button>
                            <button className="yes-button" onClick={() => { alert("Confirmed!");
                                handleCloseConfirmPopup(); 
                                }}>YES
                            </button>
                        </div>

                        <div className="conf-popup-warning">
                            DO submissions will be processed for the DO request on <strong>8:30 AM until 4:30 PM</strong>. 
                            Late submissions will be handled the next working day. Please ensure your documents are complete and meet the requirements.
                        </div>
                    </div>
                </div>
            )}
      </div>
    );
};
  
export default DOExtGenDetails;