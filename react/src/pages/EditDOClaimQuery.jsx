import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { Pencil, Save, Trash2, LogOut, X, CircleHelp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditDOClaimQuery.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const EditDOClaimQuery = () => {
    const { id } = useParams();
    console.log("EditDOClaimQuery ID:", id);
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
        <div className="dashboard_q">
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
                        <button className="tab-active">QUERY</button>
                        <button className="tab" onClick={() => navigate(`/edit-do-claim-audit/${id}`)}>AUDIT</button>
                    </div>

                    <div className="selected-bol">
                        <h4 className="form-title"><CircleHelp size={16}/> Query</h4>
                        <table>
                            <thead className="table-head">
                                <tr>
                                <th>Query ID</th>
                                <th>Requester</th>
                                <th>Query</th>
                                <th>Query Date</th>
                                <th>Responder</th>
                                <th>Response</th>
                                <th>Response Date</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className={`table-content ${data.length === 0 ? "empty" : "filled"}`}>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#888", background: "#eaeaea"}}>
                                            Sorry, no matching records found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.QueryID}</td>
                                            <td>{row.Requester}</td>
                                            <td>{row.Query}</td>
                                            <td>{row.QueryDate}</td>
                                            <td>{row.Responder}</td>
                                            <td>{row.Response}</td>
                                            <td>{row.ResponseDate}</td>
                                            <td>
                                                <button className="action-button"><X size={16}/></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>


                        {isConfirmed && (
                            <div className="confirmed" style={{textAlign: 'left', fontSize: '12px', fontWeight: 'bold', color: '#6B8E23', display: 'flex', alignItems: 'center'}}>
                                CONFIRMED
                            </div>
                        )}
                    </div>     
                </div>
            </main>  
        </div>
    );
};
  
export default EditDOClaimQuery;