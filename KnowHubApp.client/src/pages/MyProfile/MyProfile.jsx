import React, { useState, useEffect } from "react";
import "./MyProfile.css";

const MyProfile = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Id: "",
    FullName: "",
    Email: "",
    UserName: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/courses/fetchUserDetails/${id}`);
        const data = await response.json();
        setFormData({
          Id: data.id,
          FullName: data.fullName,
          Email: data.email,
          UserName: data.userName
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/courses/updateUserDetails/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.Id,
          userName: formData.UserName,
          email: formData.Email,
          fullName: formData.FullName
        })
      });

      if (response.ok) {
        console.log("User details updated successfully.");
        setIsEditing(false); // Exit edit mode after saving
      } else {
        console.error("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <h1>My Profile</h1>
      </div>
      <div className="profile-info-container">
        <div className="profile-card">
          <div className="profile-field">
            <strong>Full Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="FullName"
                value={formData.FullName}
                onChange={handleInputChange}
              />
            ) : (
              <span>{formData.FullName}</span>
            )}
          </div>
          <div className="profile-field">
            <strong>Email:</strong>
            {isEditing ? (
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{formData.Email}</span>
            )}
          </div>
          <div className="profile-field">
            <strong>Username:</strong>
            {isEditing ? (
              <input
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleInputChange}
              />
            ) : (
              <span>{formData.UserName}</span>
            )}
          </div>
          <div className="profile-field">
            <strong>Password:</strong>
            {isEditing ? (
              <input
                type="password"
                name="Password"
                value={formData.Password || ""}
                onChange={handleInputChange}
              />
            ) : (
              <span>********</span> // Masked password for view mode
            )}
          </div>
        </div>
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
