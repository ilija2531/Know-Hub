import { useContext, useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; // Import useLocation
import { AuthContext } from "../../AuthContext/AuthContext.jsx";
import './SingleCourse.css';

function SingleCourse() {
  const { courseDTOID } = useParams();
  const [course, setCourse] = useState(null);
  const { token } = useContext(AuthContext);
  const location = useLocation();
  
  // Check if the user came from the home page
  const isFromHomePage = location.state?.fromHome || false;

  useEffect(() => {
    console.log("Fetching course details for ID:", courseDTOID);

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

        if (response.ok) {
          const data = await response.json();
          console.log("Course details fetched successfully:", data);
          setCourse(data);
        } else {
          const errorMessage = await response.text();
          console.error("Failed to fetch course details:", errorMessage);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseDTOID, token]);

  if (!course) {
    return <p>Course not found or loading...</p>;
  }

  return (
    <div className="single-course-container">
      <div className="video-container">
        <video src={`http://localhost:5188${course.path}`} controls />
      </div>
      <div className="course-header">
        <h1>{course.title}</h1>
      </div>
      <div className="course-description">
        <p>{course.description}</p>
      </div>

      {/* Conditionally render buttons if not accessed from the home page */}
      {!isFromHomePage && (
        <div className="button-container">
          <div className="update-button-container">
            <Link to={`/updatecourse/${courseDTOID}/`} className="update-course-button">
              Update Course
            </Link>
          </div>
          <div className="delete-button-container">
            <Link to={`/deletecourse/${courseDTOID}/`} className="delete-course-button">
              Delete Course
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCourse;
