import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authentication token, user ID, and full name
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [id, setId] = useState(localStorage.getItem("userId") || null); // User ID
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || null); // Full Name

  // Function to save the token, id, and fullName to state and localStorage
  const saveToken = (authData) => {
    const { token: newToken, id: newId, fullName: newFullName } = authData; // Ensure fullName is included
    setToken(newToken);
    setId(newId);
    setFullName(newFullName);
    localStorage.setItem("token", newToken); // Save token
    localStorage.setItem("userId", newId); // Save user ID
    localStorage.setItem("fullName", newFullName); // Save full name
  };

  // Function to log out and clear the token, id, and fullName
  const logout = () => {
    setToken(null);
    setId(null);
    setFullName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
  };

  return (
    <AuthContext.Provider value={{ token, id, fullName, saveToken, logout }}>
      {" "}
      {/* Pass id instead of userId */}
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export { AuthContext };