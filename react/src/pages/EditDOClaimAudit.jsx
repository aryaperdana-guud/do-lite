import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { Pencil, Save, Trash2, LogOut, X , Clock} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditDOClaimAudit.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const EditDOClaimAudit = () => {
    const { id } = useParams();
    console.log("EditDOClaimAudit ID:", id);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        //check confirmed status di local storage
        const confirmedStatus = localStorage.getItem(`confirmed-${id}`);
        if (confirmedStatus === "true") {
            setIsConfirmed(true);
        }
    }, [id]);
  
    return (
        <div className="dashboard">
            <NavigationBar />
            <main className="main-content">
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

                    <div className="selected-bol">
                        <h4 className="form-title"><Clock size={16}/> Audit</h4>
                        <table>
                            <thead className="table-head">
                                <tr>
                                <th>Event</th>
                                <th>Timestamp</th>
                                <th>Remarks</th>
                                <th>User ID</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                            <tbody className={`table-content ${data.length === 0 ? "empty" : "filled"}`}>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#888", background: "#eaeaea"}}>
                                            Sorry, no matching records found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.Event}</td>
                                            <td>{row.Timestamp}</td>
                                            <td>{row.Remarks}</td>
                                            <td>{row.UserID}</td>
                                            <td>{row.Username}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>


                        {isConfirmed && (
                            <div className="confirmed">
                                CONFIRMED
                            </div>
                        )}
                    </div>     
                </div>
            </main>  
        </div>
    );
};
  
export default EditDOClaimAudit;