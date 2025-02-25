import { useState, useContext } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.jsx";
import "./SignIn.css";
import LeftImage from "../assets/LoginImage1.png";
import MovingBackground from "../components/MovingBackground";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: localStorage.getItem("savedId") || "",
    password: localStorage.getItem("savedPassword") || "",
  });

  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);

    try {
      const response = await fetch(
        "https://cdo-dev-id2.clickargo.com/be/clicdo/api/v1/clickargo/clicdo/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let result;
      try {
        result = await response.json();
      } catch (err) {
        console.error("Response parsing error:", err);
        alert("Unexpected server response. Please try again.");
        return;
      }

      if (response.ok && result.token) {
        localStorage.setItem("jwtToken", result.token);

        if (rememberMe) {
          localStorage.setItem("savedId", formData.id);
          localStorage.setItem("savedPassword", formData.password);
        } else {
          localStorage.removeItem("savedId");
          localStorage.removeItem("savedPassword");
        }

        // Fetch user profile immediately after login
        const profileResponse = await fetch(
          "https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/cac/profile/",
          {
            headers: { Authorization: `Bearer ${result.token}` },
          }
        );

        const profileData = await profileResponse.json();
        console.log("Fetched Profile:", profileData);

        const userData = {
          username: profileData.user?.name || "Unknown",
          companyName: profileData.user?.coreAccn?.accnName || "No Company",
          avatarUrl: profileData.user?.avatar || "",
        };

        setUser(userData); // Update user context
        localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage

        setTimeout(() => navigate("/bol/active"), 100);
      } else {
        alert("Login failed: " + (result.error || "Invalid credentials"));
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
  );
};

export default SignIn;
