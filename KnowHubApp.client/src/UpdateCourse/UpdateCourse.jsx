import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.jsx";
import "./UpdateCourse.css";

const UpdateCourse = () => {
  const { courseDTOID } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate(); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseFile, setCourseFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5188/api/courses/fetchSpecificCourse/${courseDTOID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course details.");
        }

        const data = await response.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (error) {
        console.error("Error fetching course details:", error);
        setMessage("Error fetching course details.");
      }
    };

    if (courseDTOID) {
      fetchCourseDetails();
    }
  }, [courseDTOID, token]);

  const handleFileChange = (e) => {
    setCourseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", courseDTOID);
    formData.append("Title", title);
    formData.append("Description", description);
    if (courseFile) {
      formData.append("CourseFile", courseFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5188/api/courses/updateCourse/${courseDTOID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log("Response:", response.status, responseText);

      if (!response.ok) {
        throw new Error(responseText || "Failed to update the course.");
      }

      setMessage("Course updated successfully!");
      
    
      setTimeout(() => {
        navigate(`/courses/${courseDTOID}`);
      }, 2000);
      
    } catch (error) {
      console.error("Error updating the course:", error);
      setMessage("Error updating the course. Please try again.");
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
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
