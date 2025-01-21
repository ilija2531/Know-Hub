import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store the authentication token and user ID (changed to id)
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [id, setId] = useState(localStorage.getItem('userId') || null); // Change userId to id

  // Function to save the token and id to state and localStorage
  const saveAuthDetails = (authData) => {
    const { token: newToken, id: newId } = authData; // Use id instead of userId
    setToken(newToken);
    setId(newId); // Set id instead of userId
    localStorage.setItem('token', newToken); // Save token for persistence
    localStorage.setItem('userId', newId); // Save id for persistence (you can keep the key name as userId for persistence)
  };

  // Function to log out and clear the token and id
  const logout = () => {
    setToken(null);
    setId(null); // Clear id instead of userId
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId'); // Remove id from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, id, saveAuthDetails, logout }}> {/* Pass id instead of userId */}
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export { AuthContext };
