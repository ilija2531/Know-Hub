import React, { useState, useEffect } from 'react';
import './MyCourses.css'; // Add your styling file here (optional)
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For getting the user ID from the URL

const MyCourses = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const [courses, setCourses] = useState([]); // State to store courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/courses/fetchUserCourses/${id}`);
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data); // Store the fetched courses
        } else {
          setError('No courses found for this user.');
        }
        setLoading(false); // Set loading to false when done
      } catch (err) {
        setError('Failed to fetch courses.');
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCourses();
  }, [id]); // Fetch courses when the user ID changes

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
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : courses.length > 0 ? (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button onClick={() => handleCourseClick(course.id)}>View Course</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );

  
  // Optional: Function to handle course click, can redirect to course details page
  function handleCourseClick(courseId) {
    console.log(`Course ID: ${courseId}`);
    // You can redirect to course details or perform other actions here
  }
};

export default MyCourses;
