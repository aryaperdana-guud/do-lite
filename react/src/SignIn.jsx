import React, { useState } from "react";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import for navigation
import "./SignIn.css";
import LeftImage from "./assets/LoginImage1.png";
import MovingBackground from "./components/MovingBackground";

const SignIn = () => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false); // Track "Remember Me" state
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle remember me change
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://your-backend-url.com/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (rememberMe) {
          // Save user data or token to localStorage if "Remember Me" is checked
          localStorage.setItem("userID", formData.userID);
        }
        alert("Login successful! Redirecting..."); //temporary
        // navigate("/dashboard");
      } else {
        // Custom error messages
        if (result.error === "Invalid password") {
          alert("Wrong password! Please try again.");
        } else if (result.error === "User not found") {
          alert("No account with this User ID. Please sign up.");
        } else {
          alert("Login failed: " + result.error);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error! Please check your connection.");
    }
  };

  return (
    <div className="app">
      <MovingBackground />
      <div className="signin-container">
        <div className="left-section">
          <img src={LeftImage} alt="Your Image" className="responsive-image" />
        </div>

        <div className="right-section">
          <Typography variant="h3" className="welcome-text">Welcome Back</Typography>
          <Typography variant="h4">
            <span className="white-text">Let's</span> <span className="blue-text">Sign In</span>
          </Typography>

          <Box component="form" className="login-form" onSubmit={handleSubmit}>
            <TextField 
              name="userID"
              fullWidth margin="normal"
              label="User ID"
              variant="filled"
              value={formData.userID}
              onChange={handleChange}
              className="LoginField"
            />

            <TextField 
              name="password"
              fullWidth margin="normal"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              value={formData.password}
              onChange={handleChange}
              className="LoginField"
            />

            {/* Remember Me checkbox */}
            <Box className="form-options">
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
                label="Remember me"
              />
              {/* Forgot Password Link */}
              <Typography variant="body2" className="forgetPass-link" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </Typography>
            </Box>

            <Button type="submit" variant="contained" fullWidth className="signIn-button">
              Sign In
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body2" className="signup-link" onClick={() => navigate("/signup")}>
              Don't have an account? Sign up here
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
