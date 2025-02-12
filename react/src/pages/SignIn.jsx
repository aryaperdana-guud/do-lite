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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://backend-url.com/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem("userID", formData.userID)
        }
        alert("Login successful! Redirecting...")
        navigate("/dashboard");
      } else {
          if (result.error === "Invalid password") {
            alert("Wrong password! Please try again.")
          } else if (result.error === "User not found") {
            alert("No account with this User ID. Please sign up.")
          } else {
            alert("Login failed: " + result.error)
          }
      }
    } catch (error) {
      console.error("Network error:", error)
      alert("Network error! Please check your connection.")
    }
  }

  return (
    <div className="app">
      <MovingBackground />
      <div className="signin-container">
        <div className="left-section">
          <img src={LeftImage} alt="Your Image" className="responsive-image" />
        </div>;
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

