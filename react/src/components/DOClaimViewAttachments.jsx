import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { PaperclipIcon, X } from "lucide-react";
import { Add as AddIcon, Check as CheckIcon } from "@mui/icons-material";
import AttachmentTable from "./TableList/AttachmentTable";
import zIndex from "@mui/material/styles/zIndex";

// Dummy data structure
const dummyAttachmentData = [
  {
    documentID: "CKJA1234567890",
    docType: "POWER OF AUTHORITY",
    authoriser: "CARGO OWNER 1",
    blNo: "MEDUU12345",
    doNo: "DO1234567890",
    createdAt: "10/02/2025 15:51:07",
    validityDate: "10/02/2025 15:51:07",
  },
  {
    documentID: "CKJA1234567890",
    docType: "CONTAINER GUARANTEE",
    authoriser: "CARGO OWNER 1",
    blNo: "MEDUU12345",
    doNo: "DO1234567890",
    createdAt: "10/02/2025 15:51:07",
    validityDate: "10/02/2025 15:51:07",
  },
];

// Custom styles to match myDO details
const cardStyles = {
  root: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    mb: 3,
  },
  header: {
    bgcolor: "#f5f5f5",
    borderBottom: "1px solid #e0e0e0",
    padding: "12px 16px",
  },
  content: {
    bgcolor: "#eaeaea",
    padding: "16px",
  },
};

const popupOverlay = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
}

const popupContent = {
  background: "#1E2A46",
  color: "white",
  padding: "20px",
  width: "350px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
}

const popupButtons = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
}

const confbuttons = {
  background: "transparent",
  width: "150px",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer"
}

const popupWarning = {
  marginTop: "20px",
  background: "white",
  color: "red",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "14px",
}

const addPopupOverlay = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
}

const addPopupContent = {
  background: "#0070c0",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "800px",
}

const addclosePopup = {
  background: "none",
  border: "none",
  color: "white",
  paddingLeft: "770px",
  paddingBottom: "0px",
}

const addFormLayout = {
  display: "flex",
  gap: "90px",
  justifyContent: "center",
}

const addForm = {
  display: "flex",
  padding: "5px",
  flexDirection: "column",
  width: "300px",
  minWidth: "100px",
  gap: "5px",
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
  textAlign: "left",
}

const submitbutton = {
  display: "auto",
  margin: "10px auto",
  background: "#263754",
  color: "white",
}

const DOClaimViewAttachments = () => {
  const [attData, setAttData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false); 
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [documentType, setDocumentType] = useState("");
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

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        setAttData(dummyAttachmentData);
      }, 500);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Attachments Card */}
      <Card sx={cardStyles.root}>
        <CardHeader
          sx={cardStyles.header}
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaperclipIcon size={24} />
              <Typography variant="h5">Attachments</Typography>
            </Box>
          }
        />
        <CardContent sx={cardStyles.content}>
          <AttachmentTable data={attData} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#263754",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#1d2a43",
                },
              }}
              onClick={handleAddClick}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{
                bgcolor: "#39E839",
                color: "white",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#2dc02d",
                },
              }}
              onClick={handleConfirmClick}
            >
              CONFIRM
            </Button>
          </Box>
        </CardContent>
      </Card>

      {showAddPopup && (
                <form onSubmit={handleSubmit}>
                    <div style={addPopupOverlay}>
                        <div style={addPopupContent}>
                            <button style={addclosePopup} onClick={handleCloseAddPopup}><X size={16}/></button>
                            <h2 style={{textAlign: "center", fontSize: "32px", marginTop: "0px", marginBottom: "20px" }}>ATTACHMENTS</h2>
                            <div style={addFormLayout}>
                                <div style={addForm}>
                                    <div>
                                        <label style={labelStyle}>Document Type</label>
                                        <div>
                                            <select style={data} placeholder="Select document type" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                                                <option value="">Select document type</option>
                                                <option value="Invoice">Bill of Lading</option>
                                                <option value="Packing List">Container Guarantee</option>
                                                <option value="Bill of Lading">Power of Authority</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Validity Date</label>
                                        <div>
                                            <input style={data} type="date" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div style={addForm}>
                                    <div>
                                        <label style={labelStyle}>BL No.</label>
                                        <div>
                                            <input style={data} type="text" placeholder="Enter BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)}/>
                                        </div>  
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Document File</label>
                                        <div>
                                            <input style={data} type="file" onChange={handleFileChange}/>
                                        </div> 
                                    </div>                    
                                </div>
                            </div>
                            
                            <button style={submitbutton}>SUBMIT</button>
                        </div>
                    </div>
                </form>
            )}

            {showConfirmPopup && (
                <div style={popupOverlay}>
                    <div style={popupContent}>
                        <h2 style={{fontSize: "40px", margin: "0px", fontWeight: "bold" }}>CONFIRMATION</h2>
                        <p>Are you sure want to confirm
                            <div>
                                <strong>DO1234567890</strong> ?
                            </div>
                        </p>

                        <div style={popupButtons}>
                            <button style={{...confbuttons, color: "red", border: "2px solid red"}} 
                                onClick={handleCloseConfirmPopup}>
                                    NO
                            </button>
                            <button style={{...confbuttons, color: "green", border: "2px solid green"}} 
                                onClick={() => { alert("Confirmed!");
                                    handleCloseConfirmPopup();
                                }}>
                                    YES
                            </button>
                        </div>

                        <div style={popupWarning}>
                            DO submissions will be processed for the DO request on <strong>8:30 AM until 4:30 PM</strong>. 
                            Late submissions will be handled the next working day. Please ensure your documents are complete and meet the requirements.
                        </div>
                    </div>
                </div>
            )}


    </Box>
  );
};

export default DOClaimViewAttachments;
