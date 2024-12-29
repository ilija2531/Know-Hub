import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateCourse.css";
import { useParams } from "react-router-dom"; // Use this if passing the courseId via the URL.

const UpdateCourse = () => {
  const { courseId } = useParams(); // Extract the courseId from the URL.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseFile, setCourseFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the current course details when the component loads
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        const { Title, Description } = response.data;
        setTitle(Title);
        setDescription(Description);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setMessage("Error fetching course details.");
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleFileChange = (e) => {
    setCourseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Title and Description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("UpdateCourseDtoId", courseId);
    formData.append("Title", title);
    formData.append("Description", description);
    if (courseFile) {
      formData.append("CourseFile", courseFile);
    }

    try {
      const response = await axios.put(
        `/api/courses/updateCourse/${courseId}`,
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
      console.error(error);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          Upload File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Update Course</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateCourse;
