import React from "react";
import { Typography } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from '@mui/joy/Input';
import "./NewBL.css";

const handleChange = (event, newValue) => {
//   alert(`You chose "${newValue}"`);
};

export function NewBL() {
  return (
    <div className="dashboard">
      <NavigationBar />
      <main className="main-content">
        <h1 className="Title">New BL</h1>

        <div className="form">
          {/* Form Title */}
          <div className="form-title">
            <h2>Add Bill of Lading</h2>
          </div>

          {/* General Details Section */}
          <div className="general-details">
            <div className="details-title">
              <Typography variant="h4">General Details</Typography>
            </div>

            <div className="details-content">

                {/* ShippingLine Option */}
              <Typography variant="h5">Shipping Line</Typography>
              <Select className="shipping-option" size="md" placeholder="Shipping Line" onChange={handleChange}>
                <Option value="Shipping 1">Shipping 1</Option>
                <Option value="Shipping 2">Shipping 2</Option>
                <Option value="Shipping 3">Shipping 3</Option>
                <Option value="Shipping 4">Shipping 4</Option>
              </Select>

                {/*remarks input*/}
              <Typography variant="h5">Remarks</Typography> 
              <Input className="remarks-field" size="md" placeholder="Medium" /> 
              
            </div>
          </div>

          {/* Party Details Section */}
          <div className="party-details"></div>

          {/* BL Details Section */}
          <div className="bl-details"></div>
        </div>
      </main>
    </div>
  );
}
