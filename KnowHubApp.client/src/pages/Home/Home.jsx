// Home.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext'; // Correct import
import './Home.css'; // Import styles for the Home component

function Home() {
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext); // Get the token from AuthContext
  const navigate = useNavigate();

  // Handle navigation to a specific course when clicked
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`); // Navigate to the course details page
  };

  useEffect(() => {
    // Fetch available courses from the API
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5188/api/courses/fetchCourses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Use the token from AuthContext
          },
        });

        if (response.ok) {
          const data = await response.json(); // Parse the JSON response
          setCourses(data); // Update the courses state
        } else {
          console.error('Failed to fetch courses:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching courses:', error); // Log any network or other errors
      }
    };

    fetchCourses(); // Call the function to fetch courses
  }, [token]);

  return (
    <div className="home-container">
      <h1 className="home-header">Available Courses</h1>
      {/* Render the list of courses if available */}
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="course-banner">
                <video
                  src={course.videoUrl}
                  className="course-video"
                  controls
                ></video>
              </div>
              <div className="course-title">{course.title}</div>
            </div>
          ))
        ) : (
          <p>No courses available.</p> // Display a message if no courses are found
        )}
      </div>
    </div>
  );
}

export default Home;
