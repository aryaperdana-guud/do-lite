import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "./SessionStore";

const SessionChecker = () => {
  const { token, expiresAt, clearSession } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const checkTimeout = () => {
      const now = Date.now();
      if (expiresAt && now >= expiresAt) {
        alert(
          "Session Timeout\n\nYou have been logged out due to expired or multiple sessions."
        );
        clearSession();
        navigate("/login");
      }
    };

    // Check session every minute
    const interval = setInterval(checkTimeout, 60000);

    return () => clearInterval(interval);
  }, [token, expiresAt, clearSession, navigate]);

  return null;
};

export default SessionChecker;
