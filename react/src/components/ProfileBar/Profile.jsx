"use client";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { UserContext } from "../UserContext"; // Import context
import "./profile.css";

const ProfileDropdown = () => {
  const router = useNavigate();
  const { user, setUser, loading } = useContext(UserContext); // Get user data from context
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user"); // Clear stored user data
    setUser(null); // Reset context
    router("/");
  };

  const handleProfile = () => router("/profile");

  return (
    <div className="profile-dropdown">
      <Box
        onClick={handleClick}
        className="profile-trigger"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {loading ? (
          <CircularProgress size={24} /> // Show loading spinner while fetching data
        ) : (
          <>
            <Avatar
              src={user?.avatarUrl}
              alt={user?.username}
              className="profile-avatar"
              sx={{
                bgcolor: user?.avatarUrl ? "transparent" : "#1976d2",
                color: "#ffffff",
              }}
            >
              {user?.username?.charAt(0) || "U"}
            </Avatar>

            <div className="profile-info">
              <Typography variant="subtitle2" className="username">
                {user?.username}
              </Typography>
              <Typography variant="caption" className="company-name">
                {user?.companyName}
              </Typography>
            </div>
            <IconButton className="dropdown-arrow" size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "profile-button" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile} className="dropmenu-item">
          <PersonIcon className="menu-icon" /> Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} className="dropmenu-item logout">
          <LogoutIcon className="menu-icon" /> Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
