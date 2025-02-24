"use client"

import { useState } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./SignIn.css"
import LeftImage from "../assets/LoginImage1.png"
import MovingBackground from "../components/MovingBackground"
import SignInForm from "../components/SignInForm"

const SignIn = () => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  // Define mock user for dev purposes
  const mockUser = {
    userID: "DEV_001", // Hardcoded user ID for development
    password: "Matthew", // Hardcoded password for development
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Dev Mode: Bypass backend and use mock credentials
    if (process.env.NODE_ENV === 'development') {
      if (formData.userID === mockUser.userID && formData.password === mockUser.password) {
        if (rememberMe) {
          localStorage.setItem("userID", formData.userID);
        }
        
        alert("Development Login Successful! Redirecting...");
        // Use setTimeout to delay the redirect after alert
        setTimeout(() => {
          navigate("/bol/active"); // Redirect to dashboard after alert is closed
        }, 100); // 100ms delay to ensure the alert has time to be dismissed
      } else {
        alert("Invalid credentials. Please try again.");
      }
      return; // Stop further execution if in dev mode
    }
  
    // Normal login process (if not in dev mode)
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      // If successful, immediately schedule the redirect
      if (result) {
        if (rememberMe) {
          localStorage.setItem("userID", formData.userID);
        }
  
        // Show alert but redirect immediately without blocking
        alert("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/bol/active"); // Redirect to dashboard after alert
        }, 100); // 100ms delay to ensure the alert is dismissed
      } else {
        alert("Login failed: " + result.error);
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
          <Typography variant="h3" className="welcome-text">
            Welcome Back
          </Typography>
          <Typography variant="h4">
            <span className="white-text">Let's</span> <span className="blue-text">Sign In</span>
          </Typography>
          <SignInForm
            formData={formData}
            rememberMe={rememberMe}
            handleChange={handleChange}
            handleRememberMeChange={handleRememberMeChange}
            handleSubmit={handleSubmit}
            navigateToSignUp={() => navigate("/signup")}
            navigateToForgotPassword={() => navigate("/forgot-password")}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn;