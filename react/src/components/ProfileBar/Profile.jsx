import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useUserStore } from "../../useUserStore.jsx"; // Import Zustand store
import "./profile.css";
import { Key, KeyIcon } from "lucide-react";
import Fade from "@mui/material/Fade";

const ProfileDropdown = () => {
  const router = useNavigate();
  const { user, setUser, clearUser } = useUserStore(); // Get Zustand state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    clearUser(); // Clear Zustand state
    router("/");
  };

  const handleProfile = () => router("/user/profile");

  const handleChangePassword = () => router("/user/change-password");

  return (
    <div className="profile-dropdown">
      <Box
        onClick={handleClick}
        className="profile-trigger"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {!user ? (
          <CircularProgress size={24} />
        ) : (
          <>
            <Avatar
              src={user.avatarUrl || undefined}
              alt={user.username}
              className="profile-avatar"
              sx={{
                bgcolor: user.avatarUrl ? "transparent" : "#1976d2",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {user.avatarUrl
                ? ""
                : user.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <div className="profile-info">
              <Typography variant="subtitle2" className="username">
                {user.username}
              </Typography>
              <Typography variant="caption" className="company-name">
                {user.companyName}
              </Typography>
            </div>
            <IconButton
              className="dropdown-arrow"
              size="small"
              sx={{
                transition: "transform 0.3s ease-in-out",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1.5, // Gives it a softer pop effect
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
            borderRadius: "10px",
            backgroundColor: "#263754",
            color: "#ffffff",
            minWidth: "180px",
          },
        }}
        s
      >
        <MenuItem
          onClick={() => {
            handleProfile();
            handleClose();
          }}
          className="dropmenu-item"
        >
          <PersonIcon className="menu-icon" /> Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleChangePassword();
            handleClose();
          }}
          className="dropmenu-item"
        >
          <KeyIcon className="menu-icon" /> Change Password
        </MenuItem>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
          className="dropmenu-item logout"
        >
          <LogoutIcon className="menu-icon" /> Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
