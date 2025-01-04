import React, { useState } from "react";
import axios from "axios";
import "./DeleteCourse.css";

const DeleteCourse = () => {
  const [id, setid] = useState("");
  const [Message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!id) {
      setMessage("Please provide a course ID.");
      return;
    }

    try {
      // API call to delete the course by ID
      await axios.delete(`http://localhost:5188/api/courses/deleteCourse/${id}`);
      setMessage("Course deleted successfully!");
      setid(""); // Reset the input field
    } catch (error) {
      console.error("Error deleting the course:", error);
      setMessage("Error deleting the course. Please check the ID and try again.");
    }
  };

  return (
    <div className="delete-course-container">
      <form onSubmit={handleDelete} className="delete-course-form">
        <h2>Delete Course</h2>
        <button type="submit">Delete Course</button>
        {Message && <p className="message">{Message}</p>}
      </form>
    </div>
  );
};

export default DeleteCourse;
