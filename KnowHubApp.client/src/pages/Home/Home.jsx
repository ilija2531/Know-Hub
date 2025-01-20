import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import "./Home.css";

function Home() {
  // State to store the list of courses
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  // Handle course click to navigate to the course details page
  const handleCourseClick = (courseDTOID) => {
    navigate(`/courses/${courseDTOID}`);
  };

  // Handle navigation to the course creation page
  const handleAddCourse = () => {
    navigate("/coursecreation");
  };

  // Fetch the list of courses from the API
  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5188/api/courses/fetchCourses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // Parse response data
        setCourses(data); // Update state with courses
      } else {
        console.error("Failed to fetch courses:", await response.text()); // Log error
      }
    } catch (error) {
      console.error("Error fetching courses:", error); // Handle request error
    }
  };

  // Fetch courses when the component is mounted or token changes
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="home-header">Available Courses</h1>
        <button className="add-course-button" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>

      <div className="courses-grid">
        {/* Render the list of courses */}
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.courseDTOID}
              className="course-card"
              onClick={() => handleCourseClick(course.courseDTOID)}
            >
              <div className="course-banner">
                {/* Video preview for the course */}
                <video
                  src={course.path}
                  className="course-video"
                  controls
                ></video>
              </div>
              <div className="course-title">{course.title}</div>
            </div>
          ))
        ) : (
          <p>No courses available.</p> // Message for empty course list
        )}
      </div>
    </div>
  );
}

export default Home;
