import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Function to save the token to state and localStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Save token for persistence
  };

  // Function to log out and clear the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export { AuthContext };
