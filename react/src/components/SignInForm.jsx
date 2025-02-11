import { Box, Button, Typography, Checkbox, FormControlLabel } from "@mui/material"
import CustomTextField from "./CustomTextField"

const SignInForm = ({
  formData,
  rememberMe,
  handleChange,
  handleRememberMeChange,
  handleSubmit,
  navigateToSignUp,
  navigateToForgotPassword,
}) => {
  return (
    <Box component="form" className="login-form" onSubmit={handleSubmit}>
      <CustomTextField name="userID" label="User ID" value={formData.userID} onChange={handleChange} />
      <CustomTextField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
      />
      <Box className="form-options">
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
          label="Remember me"
        />
        <Typography variant="body2" className="forgetPass-link" onClick={navigateToForgotPassword}>
          Forgot Password?
        </Typography>
      </Box>
      <Button type="submit" variant="contained" fullWidth className="signIn-button">
        Sign In
      </Button>
      <Typography variant="body2" className="signup-link" onClick={navigateToSignUp}>
        Don't have an account? Sign up here
      </Typography>
    </Box>
  )
}

export default SignInForm

