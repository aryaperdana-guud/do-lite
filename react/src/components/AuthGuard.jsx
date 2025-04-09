import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Check if token exists

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }

  return children;
};

export default AuthGuard;
