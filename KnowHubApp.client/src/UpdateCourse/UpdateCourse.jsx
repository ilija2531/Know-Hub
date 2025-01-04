import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateCourse.css";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { id } = useParams(); // Extract the courseId from the URL.
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [CourseFile, setCourseFile] = useState(null);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the current course details when the component loads
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5188/api/courses/updateCourse/${id}`);
        const { Title, Description } = response.data;
        setTitle(Title);
        setDescription(Description);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setMessage("Error fetching course details.");
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]); // Fixed dependency array to include `id`

  const handleFileChange = (e) => {
    setCourseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Title || !Description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("UpdateCourseDtoId", id);
    formData.append("Title", Title);
    formData.append("Description", Description);
    if (CourseFile) {
      formData.append("CourseFile", CourseFile);
    }

    try {
      await axios.put(
        `/api/courses/updateCourse/${id}`, // Fixed the URL to use `id`
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Course updated successfully!");
    } catch (error) {
      setMessage("Error updating the course. Please try again.");
      console.error("Error updating the course:", error);
    }
  };

  return (
    <div className="update-course-container">
      <form onSubmit={handleSubmit} className="update-course-form">
        <h2>Update Course</h2>
        <label>
          Title:
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Upload File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Update Course</button>
        {Message && <p className="message">{Message}</p>}
      </form>
    </div>
  );
};

export default UpdateCourse;
