import React, { useState } from "react";
import axios from "axios";
import "./DeleteCourse.css";
import { useParams } from "react-router-dom";

const DeleteCourse = () => {
  const { id } = useParams(); // Extract the courseId from the URL.
  const [Message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5188/api/courses/deleteCourse/${id}`);
      setMessage("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting the course:", error);
      setMessage("Error deleting the course. Please try again.");
    }
  };

  return (
    <div className="delete-course-container">
      <div className="delete-course-message">
        <h2>Are you sure you want to delete this course?</h2>
        <button onClick={handleDelete} className="delete-button">
          Delete Course
        </button>
        {Message && <p className={`message ${Message.includes("successfully") ? "success" : "error"}`}>{Message}</p>}
      </div>
    </div>
  );
};

export default DeleteCourse;
