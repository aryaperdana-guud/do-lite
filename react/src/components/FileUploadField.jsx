import React, { useState, useRef } from 'react';
import './FileUploadField.css';

const FileUploadField = () => {
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      if (e.target.files.length > 0) {
        setFileName(e.target.files[0].name);
      }
    };
  
    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };

  return (
    <div className="file-upload-container">
      <div className="file-upload-field-container">
        <div className="file-display-area">
          {fileName || 'Upload File Here'}
        </div>
        <button 
          onClick={handleBrowseClick}
          className="browse-button"
        >
          Browse
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden-file-input"
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default FileUploadField;