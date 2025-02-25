import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) return; // ✅ Prevent unnecessary API calls

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://cdo-dev-id2.clickargo.com/be/clicdo/api/co/cac/profile/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);

        const userData = {
          username: response.data.user?.name || "Unknown",
          companyName: response.data.user?.coreAccn?.accnName || "No Company",
          avatarUrl: response.data.user?.avatar || "",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]); // ✅ Only run when `user` is null

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
