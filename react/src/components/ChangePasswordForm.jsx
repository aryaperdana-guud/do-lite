import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const formStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: "calc( 100% - 40px)",
      height: "calc(100% - 300px)",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(1, 0, 0, 0.2)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    formField: {
      marginBottom: "30px",
    },
    passwordHint: {
      fontSize: "12px",
      color: "#777",
      marginTop: "4px",
    },
  };

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={formStyles.container}>
      <Box sx={formStyles.header}>
        <Typography variant="h5" color="#263754" fontWeight={500}>
          Change Password
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0066cc",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0055b3",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <Divider sx={{ marginBottom: "30px" }} />

      <Box sx={formStyles.formField}>
        <TextField
          fullWidth
          id="current-password"
          label="Current Password*"
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          type={showCurrentPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleCurrentPassword}
                  edge="end"
                >
                  {showCurrentPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={formStyles.passwordHint}>
          Password must be 8-20 characters long. Passwords are case sensitive.
        </Typography>
      </Box>

      <Box sx={formStyles.formField}>
        <TextField
          fullWidth
          id="new-password"
          label="New Password*"
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={formStyles.passwordHint}>
          Password must be 8-20 characters long. Passwords are case sensitive.
        </Typography>
      </Box>

      <Box sx={formStyles.formField}>
        <TextField
          fullWidth
          id="confirm-password"
          label="Confirm Password*"
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={formStyles.passwordHint}>
          Password must be 8-20 characters long. Passwords are case sensitive.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
