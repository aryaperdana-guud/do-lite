import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(
        () => {
          alert("Session expired due to inactivity.");
          navigate("/"); //
        },
        15 * 60 * 1000
      ); // 15 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer(); // Start timer

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default AutoLogout;
