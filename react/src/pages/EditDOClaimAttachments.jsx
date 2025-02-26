import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { MousePointer, Pencil, Save, Trash2, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EditDOClaimAttachments.css"
import React, { useState } from "react"
import { useParams } from "react-router-dom";

const EditDOClaimAttachments = () => {
    const { id } = useParams();
    console.log("EditDOClaimAttachments ID:", id);
    const navigate = useNavigate();
    const [data] = useState([]);

    const [isConfirmed, setIsConfirmed] = useState(
        localStorage.getItem(`confirmed-${id}`) === "true"
    );

    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const handleConfirmClick = () => {
        setShowConfirmPopup(true); // pop-up konfirmasi
    };

    const handleSaveConfirm = () => {
        setIsConfirmed(true);
        localStorage.setItem(`confirmed-${id}`, "true");
        setShowConfirmPopup(false); // Tutup pop-up setelah save
    };

    const handleCancelConfirm = () => {
        setShowConfirmPopup(false); // Tutup pop-up tanpa menyimpan konfirmasi
    };
  
    return (
        <div className="dashboard_att">
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
                        <button className="tab-active">ATTACHMENTS</button>
                        <button className="tab" onClick={() => navigate(`/edit-do-claim-query/${id}`)}>QUERY</button>
                        <button className="tab" onClick={() => navigate(`/edit-do-claim-audit/${id}`)}>AUDIT</button>
                    </div>

                    <div className="selected-bol">
                        <h4 className="form-title"><MousePointer size={16}/> Selected Bill of Ladings</h4>
                        <table>
                            <thead className="table-head">
                                <tr>
                                <th>Document ID</th>
                                <th>Document Type</th>
                                <th>Authoriser</th>
                                <th>BL No.</th>
                                <th>DO No.</th>
                                <th>Created At</th>
                                <th>Validity Date</th>
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
                                            <td>{row.DocumentID}</td>
                                            <td>{row.DocumentType}</td>
                                            <td>{row.Authoriser}</td>
                                            <td>{row.BLNo}</td>
                                            <td>{row.DONo}</td>
                                            <td>{row.CreatedAt}</td>
                                            <td>{row.ValidityDate}</td>
                                            <td>
                                                <button className="action-button"><X size={16}/></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="bottom-buttons">
                            <button className="add-button">
                                ADD
                            </button>
                            <button className="confirm-button">
                                CONFIRM
                            </button>
                        </div>


                        {/* <div className="bottom-buttons">
                            {!isConfirmed && (
                                <button className="add-button">
                                    Add
                                </button>
                            )}
                            <button className="confirm-button" onClick={handleConfirmClick} disabled={isConfirmed}>
                                {isConfirmed ? "Confirmed" : "Confirm"}
                            </button>
                        </div> */}
                    </div>
                </div>
            </main>  
        </div>
    );
};
  
export default EditDOClaimAttachments;