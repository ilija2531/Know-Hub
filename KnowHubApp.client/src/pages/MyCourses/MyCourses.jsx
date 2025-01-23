import React, { useState, useEffect } from 'react';
import './MyCourses.css'; // Add your styling file here (optional)
import { useAuth } from '../../AuthContext/AuthContext'; // For getting the user ID from the URL
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { token, id } = useAuth(); // Get the user ID and token from context
  const [courses, setCourses] = useState([]); // State to store courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleCourseClick = (courseDTOID) => {
    navigate(`/courses/${courseDTOID}`);
  };
  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5188/api/courses/fetchUserCourses/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token if required
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses.');
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {
          setCourses(data); // Store the fetched courses
        } else {
          setError('No courses found for this user.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching courses.');
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchCourses();
  }, [id, token]); // Fetch courses when the user ID or token changes

  // If loading, show loading message
  if (loading) {
    return <div>Loading your courses...</div>;
  }

  // If there's an error, display it
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>
      {courses.length > 0 ? (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.courseDTOID} className="course-card">
              <div className="course-banner">
                {/* Video preview for the course */}
                <video
                  src={`http://localhost:5188${course.path}`}
                  className="course-video"
                  controls
                ></video>
              </div>
              <div className="course-title">{course.title}</div>
              <p>{course.description}</p>
              <button onClick={() => handleCourseClick(course.courseDTOID)}>View Course</button>
            </li>
    
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );

  
 

    
    
  
};

export default MyCourses;
