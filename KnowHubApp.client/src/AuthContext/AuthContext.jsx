import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authentication token and user ID
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  // Function to save the token and userId to state and localStorage
  const saveAuthDetails = (authData) => {
    const { token: newToken, id } = authData;
    setToken(newToken);
    setUserId(id);
    localStorage.setItem('token', newToken); // Save token for persistence
    localStorage.setItem('userId', id); // Save userId for persistence
  };

  // Function to log out and clear the token and userId
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId'); // Remove userId from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, userId, saveAuthDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export { AuthContext };