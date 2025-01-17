import React, { useState, useEffect } from "react";
import "./MyProfile.css";

const MyProfile = ({ id }) => {
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
          `http://localhost:5188/api/courses/fetchUserDetails/${id}`
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
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

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
        `http://localhost:5188/api/courses/updateUserDetails/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user details.");
      }

      console.log("User details updated successfully.");
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
                  name="FullName"
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
                  name="Email"
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
                  name="UserName"
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
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
