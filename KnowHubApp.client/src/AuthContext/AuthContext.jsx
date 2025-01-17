// AuthContext.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save to localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context and the useAuth hook
export const useAuth = () => useContext(AuthContext); // Export this hook

export { AuthContext }; // Ensure it's exported too
