import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext/AuthContext"; // Import AuthContext for token and userId
import "./MyProfile.css";

const MyProfile = () => {
  const { token, id, saveToken } = useAuth(); // Get token and userId from AuthContext
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    email: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5188/api/accounts/fetchUserDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setFormData({
          id: data.id,
          userName: data.userName,
          email: data.email,
          fullName: data.fullName,
        });
        saveToken({ token, id, fullName: data.fullName }); // Save full name to AuthContext
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data if userId is available
    if (id) {
      fetchUserData();
    }
  }, [id, token, saveToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5188/api/accounts/updateUserDetails/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token for authentication
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user details.");
      }
      const updatedData = await response.json();
      console.log("User details updated successfully.");
      saveToken({ token, id, fullName: updatedData.fullName }); // Update AuthContext with full name
      setError("");
      setIsEditing(false); // Exit edit mode after saving
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <h1>My Profile</h1>
      </div>
      <div className="profile-info-container">
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <div className="profile-card">
            <div className="profile-field">
              <strong>Full Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName" // Ensure name matches API field
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.fullName}</span>
              )}
            </div>
            <div className="profile-field">
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email" // Ensure name matches API field
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.email}</span>
              )}
            </div>
            <div className="profile-field">
              <strong>Username:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="userName" // Ensure name matches API field
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.userName}</span>
              )}
            </div>
          </div>
        )}
        <div className="buttons-container">
          <button onClick={toggleEditMode} className="edit-button">
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
