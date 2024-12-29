import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeleteCourse.css";

const DeleteCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the list of courses when the component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setMessage("No courses found.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error.response ? error.response.data : error.message);
        setMessage("Error fetching courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!selectedCourseId) {
      setMessage("Please select a course to delete.");
      return;
    }

    try {
      await axios.delete(`/api/courses/deleteCourse/${selectedCourseId}`);
      setMessage("Course deleted successfully!");
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== selectedCourseId));
      setSelectedCourseId("");
    } catch (error) {
      setMessage("Error deleting the course. Please try again.");
      console.error("Error deleting the course:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="delete-course-container">
      <form onSubmit={handleDelete} className="delete-course-form">
        <h2>Delete Course</h2>
        <label>
          Select Course:
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">-- Select a course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Delete Course</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default DeleteCourse;
