import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext.jsx"; // Import AuthContext
import './SingleCourse.css';

function SingleCourse() {
  const { courseDTOID } = useParams(); // Extract the course ID from the URL
  const [course, setCourse] = useState(null); // Initialize state for the course details
  const { token } = useContext(AuthContext); // Get the token from AuthContext

  useEffect(() => {
    console.log("Fetching course details for ID:", courseDTOID); // Log the course ID being fetched

    // Fetch the details of the selected course
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5188/api/courses/fetchSpecificCourse/${courseDTOID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from AuthContext
            },
          }
        );

        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          console.log("Course details fetched successfully:", data); // Log the fetched course details
          setCourse(data); // Update the course state
        } else {
          const errorMessage = await response.text();
          console.error("Failed to fetch course details:", errorMessage); // Log the error message
        }
      } catch (error) {
        console.error("Error fetching course details:", error); // Log any network or other errors
      }
    };

    fetchCourseDetails(); // Call the function to fetch course details
  }, [courseDTOID, token]);

  if (!course) {
    return <p>Course not found or loading...</p>; // Display a loading or not found message
  }

  return (
    <div className="single-course-container">
      <div className="video-container">
        <video src={`http://localhost:5188${course.path}`} controls />{" "}
        {/* Display the course video */}
      </div>
      <div className="course-header">
        <h1>{course.title}</h1> {/* Display the course title */}
      </div>
      <div className="course-description">
        <p>{course.description}</p> {/* Display the course description */}
      </div>
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
    </div>
  );
}

export default SingleCourse;
