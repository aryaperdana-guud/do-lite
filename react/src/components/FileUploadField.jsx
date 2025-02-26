import React, { useState } from "react";
import { styled } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/joy/Typography";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function FileUploadField({ onFileUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (onFileUploaded) {
        onFileUploaded(file);
      }
    }
  };

  return (
    <div className="file-upload-container">
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        color="neutral"
        startDecorator={<CloudUploadIcon />}
      >
        Upload BL File
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <Typography level="body-sm" sx={{ mt: 1 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
    </div>
  );
}
