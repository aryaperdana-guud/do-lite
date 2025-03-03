import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { FileSearch, LogOut,Ship, CalendarPlus2, Container, ReceiptText} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DOExtGenDetails.css"
import React from "react"
import { useParams } from "react-router-dom";

const DOExtGenDetails = () => {
    const { id } = useParams();
    console.log("Current ID:", id);
    const navigate = useNavigate();

    const DateComponent = ({ date }) => {
        return <p>{new Date(date).toLocaleDateString("id-ID")}</p>;
    }; //date hari ini
  
    return (
      <div className="dashboard_ext_genDet">
        <NavigationBar />
        <main className="main-content">
            <h1 className="title"><FileSearch size={40}/> DO Extension Details</h1>
            <div className="detail-container">
                <div className="detail-header">
                    <h2>Extend DO Details</h2>
                    <button className="logout-button" onClick={() => navigate("/do-extension/active")}><LogOut /></button>
                </div>
                <div className="tabs">
                    <button className="active-tab">GENERAL DETAILS</button>
                    <button className="tab">AUDIT</button>
                </div>
                <div className="ext-form">
                    <div className="gen-details">
                        <h4 className="gd-title"><Ship size={16}/> General Details</h4>
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
                            <h4 className="ext-title"><CalendarPlus2 size={16}/> Extension Details</h4>
                            <div>
                                <label className="label">No of Container</label>
                                <div className="data">2</div>
                            </div>
                        </div>

                        <div className="con4ext">
                            <h4 className="con-title"> <Container size={16}/> Containers for Extension</h4>
                        </div>
                    </div>
                </div>
                <div className="charge-det">
                    <h4 className="charge-title"><ReceiptText size={16} /> Extension Charge</h4>
                    <div className="newVTD">
                        <label>New Valid Till Date</label>
                        <div>
                            <input type="date" />
                            <button className="calc">CALCULATE</button>
                        </div>
                    </div>
                    <div className="fees">
                        <div className="leftside">
                            <div>
                                <label className="label">Admin Fee</label>
                                <div className="data-chrg">Rp 20.000</div>
                            </div>
                            <div>
                                <label className="label">Admin Fee</label>
                                <div className="data-chrg">Rp 20.000</div>
                            </div>
                        </div>
                        <div className="rightside">
                            <div>
                                <label className="label">Admin Fee</label>
                                <div className="data-chrg">Rp 20.000</div>
                            </div>
                            <div>
                                <label className="label">Admin Fee</label>
                                <div className="data-chrg">Rp 20.000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="s-btn">SAVE</button>
                    <button className="c-btn">CONFIRM</button>
                </div>
            </div>
        </main>  
      </div>
    );
};
  
export default DOExtGenDetails;