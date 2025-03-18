import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Grid,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  AttachFile,
  Check as CheckIcon,
  Close as CloseIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { PaperclipIcon, Rotate3D, X } from "lucide-react";
import AttachmentTable from "./TableList/AttachmentTable";
import { formatDate } from "./Utility/formatDate";
import { useParams } from "react-router-dom";

// Card styles
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

// Popup styles
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
};

const popupContent = {
  background: "#1E2A46",
  color: "white",
  padding: "20px",
  width: "350px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
};

const popupButtons = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const confbuttons = {
  background: "transparent",
  width: "150px",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const popupWarning = {
  marginTop: "20px",
  background: "white",
  color: "red",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "14px",
};

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
};

const addPopupContent = {
  background: "#0070c0",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "800px",
};

const addclosePopup = {
  background: "none",
  border: "none",
  color: "white",
  paddingLeft: "770px",
  paddingBottom: "0px",
};

const addFormLayout = {
  display: "flex",
  gap: "90px",
  justifyContent: "center",
};

const addForm = {
  display: "flex",
  padding: "5px",
  flexDirection: "column",
  width: "300px",
  minWidth: "100px",
  gap: "5px",
};

const labelStyle = {
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
};

const submitbutton = {
  display: "auto",
  margin: "10px auto",
  background: "#263754",
  color: "white",
};

const DOClaimViewAttachments = ({}) => {
  const [attData, setAttData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [validityDate, setValidityDate] = useState("");
  const [blNo, setBlNo] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [doNo, setDoNo] = useState("");
  const { id } = useParams();
  const jobId = id;
  const apiUrl = `https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/job/ckJobDoClaim/${jobId}`;
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!jobId || !token) return;

    async function fetchAttachmentData() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Set DO number for confirmation dialog
        if (responseData.jobAttchList && responseData.jobAttchList.length > 0) {
          setDoNo(responseData.jobAttchList[0].doNo || "");
        }

        // Format the attachment data according to the mapping
        const formattedAttachments = responseData.jobAttchList
          ? responseData.jobAttchList.map((attachment) => ({
              documentID: attachment.attId || "-",
              docType: attachment.tmstAttType?.mattName || "-",
              authoriser: attachment.authorizer || "-",
              blNo: attachment.attRefNo || "-",
              doNo: attachment.doNo || "-",
              createdAt: formatDate(attachment.attDtCreate) || "-",
              validityDate: formatDate(attachment.attDtValid) || "-",
            }))
          : [];

        setAttData(formattedAttachments);
      } catch (error) {
        console.error("Error fetching attachment data:", error);
      }
    }

    fetchAttachmentData();
  }, [jobId, token, apiUrl]);

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleConfirmClick = () => {
    setShowConfirmPopup(true);
  };

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  const handleFileChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!documentType || !validityDate || !blNo || !documentFile) {
      alert("Please fill in all fields.");
      return;
    }

    // Here you would implement the API call to upload the file
    // For now, we'll just log the data
    console.log("Submitting Data:", {
      documentType,
      validityDate,
      blNo,
      documentFile,
    });

    try {
      // This is a placeholder for your actual file upload API call
      // const formData = new FormData();
      // formData.append("file", documentFile);
      // formData.append("documentType", documentType);
      // formData.append("validityDate", validityDate);
      // formData.append("blNo", blNo);

      // const response = await fetch(uploadApiUrl, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      alert("File uploaded successfully!");

      // Reset form
      setDocumentType("");
      setValidityDate("");
      setBlNo("");
      setDocumentFile(null);

      // Close popup
      setShowAddPopup(false);

      // Refetch data to update the table
      // fetchAttachmentData();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

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
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#1d2a43",
                },
              }}
              onClick={handleAddClick}
            >
              Add
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{
                bgcolor: "#0070c0",
                color: "white",
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#263754",
                },
              }}
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
          </Box>
        </CardContent>
      </Card>

      {showAddPopup && (
        <Dialog
          open={showAddPopup}
          onClose={handleCloseAddPopup}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: "#263754",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "white",
              }}
            >
              <AttachFile sx={{ fontSize: 24 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem !important",
                  letterSpacing: 0.5,
                  color: "white !important",
                }}
              >
                Atatchment
              </Typography>
            </Box>
            <IconButton
              onClick={handleCloseAddPopup}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={{
              background: "#ffffff",
              padding: 4,
              paddingTop: "32px !important",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "#333333",
                      fontSize: "0.9rem",
                      pl: 0.5,
                    }}
                  >
                    Document Type
                  </Typography>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <Select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      displayEmpty
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1.5,
                        height: 56,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bdbdbd",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#263754",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 1,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Typography color="text.secondary">
                          Select document type
                        </Typography>
                      </MenuItem>
                      <MenuItem value="BILL OF LADING">Bill of Lading</MenuItem>
                      <MenuItem value="CONTAINER GUARANTEE">
                        Container Guarantee
                      </MenuItem>
                      <MenuItem value="POWER OF AUTHORITY">
                        Power of Authority
                      </MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "#333333",
                      fontSize: "0.9rem",
                      pl: 0.5,
                    }}
                  >
                    Validity Date
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      type="date"
                      value={validityDate}
                      onChange={(e) => setValidityDate(e.target.value)}
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1.5,
                        height: 40,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bdbdbd",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#263754",
                        },
                      }}
                      inputProps={{
                        style: { color: "#333333", padding: "14px 16px" },
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "#333333",
                      fontSize: "0.9rem",
                      pl: 0.5,
                    }}
                  >
                    BL No.
                  </Typography>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <OutlinedInput
                      value={blNo}
                      onChange={(e) => setBlNo(e.target.value)}
                      placeholder="Enter BL No."
                      sx={{
                        bgcolor: "white",
                        borderRadius: 1.5,
                        height: 40,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bdbdbd",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#263754",
                        },
                      }}
                      inputProps={{
                        style: { color: "#333333", padding: "14px 16px" },
                      }}
                    />
                  </FormControl>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: "#333333",
                      fontSize: "0.9rem",
                      pl: 0.5,
                    }}
                  >
                    Document File
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      bgcolor: "white",
                      borderRadius: 1.5,
                      p: 0,
                      border: `1px solid #e0e0e0`,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#bdbdbd",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <input
                        accept="image/*,application/pdf"
                        style={{ display: "none" }}
                        id="document-file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="document-file"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Button
                          variant="text"
                          component="span"
                          startIcon={
                            <UploadFileIcon
                              sx={{
                                color: documentFile ? "#263754" : "#9e9e9e",
                              }}
                            />
                          }
                          sx={{
                            color: documentFile ? "#333333" : "#9e9e9e",
                            width: "100%",
                            height: "100%",
                            justifyContent: "flex-start",
                            textTransform: "none",
                            pl: 2,
                            fontWeight: documentFile ? 500 : 400,
                          }}
                        >
                          {documentFile ? documentFile.name : "Choose File"}
                        </Button>
                      </label>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#263754",
                    color: "white",
                    fontSize: "0.9rem",
                    px: 5,
                    py: 1.5,
                    borderRadius: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(38, 55, 84, 0.3)",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#1e2c45",
                      boxShadow: "0 6px 12px rgba(38, 55, 84, 0.4)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmPopup}
        onClose={handleCloseConfirmPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: "#263754",
            textAlign: "center",
            color: "white",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              gap: 1.5,
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "white !important",
              }}
            >
              CONFIRMATION
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 1, mt: 2 }}
          >
            Are you sure want to confirm?
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Extensions Job cannot be deleted or changed after confirmed
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ bgcolor: "#f8f8f8", p: 2, borderRadius: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "red", textAlign: "center" }}
            >
              DO submissions will be processed for the DO request on{" "}
              <strong>8:30 AM until 4:30 PM</strong>. Late submissions will be
              handled the next working day. Please ensure your documents are
              complete and meet the requirements.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3, justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmPopup}
            sx={{
              px: 4,
              color: "red",
              borderColor: "red",
              "&:hover": { bgcolor: "red", color: "white", borderColor: "red" },
            }}
          >
            NO
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              alert("Confirmed!");
              handleCloseConfirmPopup();
            }}
            sx={{
              px: 4,
              bgcolor: "white",
              color: "green",
              "&:hover": { bgcolor: "darkgreen", color: "white" },
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DOClaimViewAttachments;
