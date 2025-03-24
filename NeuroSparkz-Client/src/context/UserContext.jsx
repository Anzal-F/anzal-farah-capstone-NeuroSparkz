import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUser({ userId: savedUserId });
    }
  }, []);

  const login = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-userid`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = response.data.userId;
      
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setUser({ userId });
      setToken(token);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};