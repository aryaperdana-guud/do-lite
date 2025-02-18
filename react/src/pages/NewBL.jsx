import React, { useState } from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from '@mui/joy/Input';
import "./NewBL.css";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import FileUploadField from "../components/NewBLField.jsx";

export function NewBL() {
  // Form state management
  const [formData, setFormData] = useState({
    shippingLine: '',
    remarks: '',
    cargoOwner: '',
    blNumber: '',
    containerNumber: '',
    blFile: null
  });
  
  // Handle input changes for text fields
  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };
  
  // Handle select changes
  const handleSelectChange = (field) => (event, newValue) => {
    setFormData({
      ...formData,
      [field]: newValue
    });
  };
  
  // Handle file upload
  const handleFileUpload = (file) => {
    setFormData({
      ...formData,
      blFile: file
    });
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form
    if (!formData.shippingLine || !formData.blNumber || !formData.containerNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Process form data here (e.g., send to API)
    console.log('Form data submitted:', formData);
    
    // Show success message
    alert('Bill of Lading created successfully');
    
    // Reset form
    setFormData({
      shippingLine: '',
      remarks: '',
      cargoOwner: '',
      blNumber: '',
      containerNumber: '',
      blFile: null
    });
  };

  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">New BL</h1>

        <form className="form" onSubmit={handleSubmit}>
          {/* Form Title */}
          <div className="form-title">
            Add Bill of Lading
          </div>

          <div className="cards-container">
            <div className="left-group">

              {/* General Details Section */}
              <div className="general-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">General Details</Typography>
                </div>

                <div className="details-content">
                  {/* ShippingLine Option */}
                  <Typography variant="h6">Shipping Line <span className="required">*</span></Typography>
                  <Select 
                    className="shipping-option" 
                    size="md" 
                    placeholder="Select Shipping Line"
                    value={formData.shippingLine}
                    onChange={handleSelectChange('shippingLine')}
                    required
                  >
                    <Option value="Shipping 1">MSC</Option>
                    <Option value="Shipping 2">COSCO</Option>
                    <Option value="Shipping 3">Maersk</Option>
                    <Option value="Shipping 4">Shipping 4</Option>
                  </Select>

                  {/*remarks input*/}
                  <Typography variant="h6">Remarks</Typography> 
                  <Input 
                    className="remarks-field" 
                    size="md" 
                    placeholder="Add any remarks here" 
                    value={formData.remarks}
                    onChange={handleInputChange('remarks')}
                  /> 
                </div>
              </div>

              {/* Party Details Section */}
              <div className="party-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">Party Details</Typography>
                </div>
                <div className="details-content">
                  <Typography variant="h6">Cargo Owner</Typography>
                  <Select 
                    className="shipping-option" 
                    size="md" 
                    placeholder="Select Cargo Owner"
                    value={formData.cargoOwner}
                    onChange={handleSelectChange('cargoOwner')}
                  >
                    <Option value="Owner 1">Owner 1</Option>
                    <Option value="Owner 2">Owner 2</Option>
                    <Option value="Owner 3">Owner 3</Option>
                    <Option value="Owner 4">Owner 4</Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="right-group">
              {/* BL Details Section */}
              <div className="bl-details">
                <div className="details-title">
                  <Typography variant="h5" fontWeight="bold">BL Details</Typography> 
                </div>
                <div className="details-content">
                <Typography variant="h6">BL Number <span className="required">*</span></Typography> 
                <Input 
                  className="BLNumber-field" 
                  size="md" 
                  placeholder="Enter BL Number" 
                  value={formData.blNumber}
                  onChange={handleInputChange('blNumber')}
                  required
                />

                <Typography variant="h6">Container Number <span className="required">*</span></Typography> 
                <Input 
                  className="BLNumber-field" 
                  size="md" 
                  placeholder="Enter Container Number" 
                  value={formData.containerNumber}
                  onChange={handleInputChange('containerNumber')}
                  required
                />
                
                <Typography variant="h6">BL File</Typography> 
                <FileUploadField onFileUploaded={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>
          
          <Box className="submit-button" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button type="submit">Submit</Button>
            <Button 
              variant="outlined" 
              color="neutral" 
              onClick={() => {
                setFormData({
                  shippingLine: '',
                  remarks: '',
                  cargoOwner: '',
                  blNumber: '',
                  containerNumber: '',
                  blFile: null
                });
              }}
            >
              Clear
            </Button>
          </Box>
        </form>
      </main>
    </div>
  );
}