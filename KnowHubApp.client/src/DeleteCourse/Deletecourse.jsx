import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext"; // Import the context
import "./DeleteCourse.css"; // Include styles for the page

const DeleteCourse = () => {
  const { id } = useParams(); // Extract the course ID from the URL
  const { token } = useAuth(); // Get token from context
  const [course, setCourse] = useState(null); // Store the course details
  const [message, setMessage] = useState(""); // Store any messages (success or error)
  const navigate = useNavigate(); // Initialize navigation for redirecting

  // Fetch course details to display the title for confirmation
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5188/api/courses/fetchSpecificCourse/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data); // Set the fetched course details
      } catch (error) {
        console.error("Error fetching course details:", error);
        setMessage("Error fetching course details.");
      }
    };

    if (id) {
      fetchCourseDetails(); // Fetch course details when component mounts
    }
  }, [id, token]);

  const handleDelete = async () => {
    if (!token) {
      setMessage("You need to be logged in to delete a course.");
      return;
    }

    try {
      // Sending DELETE request to remove the course
      const response = await axios.delete(
        `http://localhost:5188/api/courses/deleteCourse/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message and redirect to another page (e.g., Home)
      setMessage("Course deleted successfully!");
      setTimeout(() => {
        navigate("/home"); // Redirect after successful deletion
      }, 2000); // Wait 2 seconds before redirect
    } catch (error) {
      console.error("Error deleting the course:", error);
      setMessage("Error deleting the course. Please try again.");
    }
  };

  // Display loading or course details message
  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="delete-course-container">
      <div className="delete-course-message">
        <h2>Are you sure you want to delete the course: {course.title}?</h2>
        <p>This action cannot be undone.</p>

        {/* Button to confirm course deletion */}
        <button onClick={handleDelete} className="delete-button">
          Delete Course
        </button>

        {/* Display success or error message */}
        {message && <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteCourse;
