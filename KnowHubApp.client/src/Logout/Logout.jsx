import './Logout.css';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Import AuthContext hook

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from AuthContext

  useEffect(() => {
    const performLogout = () => {
      logout(); // Clear local authentication state
      console.log("Logout successful, navigating to the welcome page...");
      setTimeout(() => {
        // Navigate to the welcome page after 2.5 seconds
        navigate("/");
      }, 2500); // 2500ms = 2.5 seconds
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div>
      <p className='logout'>Logging out...</p>
    </div>
  );
};

export default Logout;
