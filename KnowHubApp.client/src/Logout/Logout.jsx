import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Import the useAuth hook

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from AuthContext

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Logout failed with status: ${response.status}`);
        }

        logout(); // Clear token via context
        console.log("Logout successful, navigating to home page...");
        navigate("/"); // Redirect to home or login page
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, [logout, navigate]);

  useEffect(() => {
    // Fallback navigation in case the logout doesn't work
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirect to the home page after 3 seconds if not redirected automatically

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
