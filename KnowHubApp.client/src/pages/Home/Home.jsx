import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../../AuthContext/AuthContext'; // Corrected path and import

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth(); // Correctly using the hook

  const navigateToCourseCreation = () => {
    navigate('/courseCreation');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5188/api/courses/fetchCourses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]); // Dependency on token

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Explore Your Learning Journey</h1>
      </header>
      <div className="courses-container">
        <div className="courses-header">
          <h2>Courses</h2>
          <button className="create-course-button" onClick={navigateToCourseCreation}>
            Create a New Course
          </button>
        </div>
        <div className="courses-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))
          ) : (
            <p>No courses available. Create a new course to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
