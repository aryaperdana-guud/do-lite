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

    const [showAddPopup, setShowAddPopup] = useState(false); 
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [documentType, setDocumentType] = useState(""); // Tambahkan state ini
    const [validityDate, setValidityDate] = useState("");
    const [blNo, setBlNo] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
  
    const handleAddClick = () => {
        setShowAddPopup(true); // Menampilkan pop-up saat tombol ADD diklik
    };

    const handleCloseAddPopup = () => {
        setShowAddPopup(false); // Menutup pop-up
    };

    const handleConfirmClick = () => {
        setShowConfirmPopup(true); //confirm pop-up
    }

    const handleCloseConfirmPopup = () => {
        setShowConfirmPopup(false); //close confirm
    }

    const handleFileChange = (event) => {
        setDocumentFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!documentType || !validityDate || !blNo || !documentFile) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Submitting Data:", {
            documentType,
            validityDate,
            blNo,
            documentFile,
        });

        alert("File uploaded successfully!");

        //reset form
        setDocumentType("");
        setValidityDate("");
        setBlNo("");
        setDocumentFile(null);

        setShowAddPopup(false); // Close pop-up after submit
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
                            <button className="add-button" onClick={handleAddClick}>
                                ADD
                            </button>
                            <button className="confirm-button" onClick={handleConfirmClick}>
                                CONFIRM
                            </button>
                        </div>
                    </div>
                </div>
            </main>  

            {showAddPopup && (
                <form onSubmit={handleSubmit}>
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-popup" onClick={handleCloseAddPopup}><X size={16}/></button>
                            <h2 className="popup-title">ATTACHMENTS</h2>
                            <div className="form-layout">
                                <div className="form-1">
                                    <div>
                                        <label className="popup-label">Document Type</label>
                                        <div>
                                            <select placeholder="Select document type" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                                                <option value="">Select document type</option>
                                                <option value="Invoice">Bill of Lading</option>
                                                <option value="Packing List">Container Guarantee</option>
                                                <option value="Bill of Lading">Power of Authority</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="popup-label">Validity Date</label>
                                        <div>
                                            <input type="date" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-2">
                                    <div>
                                        <label className="popup-label">BL No.</label>
                                        <div>
                                            <input type="text" placeholder="Enter BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)}/>
                                        </div>  
                                    </div>
                                    <div>
                                        <label className="popup-label">Document File</label>
                                        <div>
                                            <input type="file" onChange={handleFileChange}/>
                                        </div> 
                                    </div>                    
                                </div>
                            </div>
                            
                            <button className="submit-button">SUBMIT</button>
                        </div>
                    </div>
                </form>
            )}

            {showConfirmPopup && (
                <div className="conf-popup-overlay">
                    <div className="conf-popup-content">
                        <h2 className="conf-popup-title">CONFIRMATION</h2>
                        <p>Are you sure want to confirm 
                            <div>
                                <strong>DO1234567890</strong> ?
                            </div>
                        </p>

                        <div className="conf-popup-buttons">
                            <button className="no-button" onClick={handleCloseConfirmPopup}>NO</button>
                            <button className="yes-button" onClick={() => alert("Confirmed!")}>YES</button>
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
  
export default EditDOClaimAttachments;