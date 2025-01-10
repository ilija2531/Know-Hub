import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../../AuthContext/AuthContext';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

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
  }, [token]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Explore Your Learning Journey</h1>
      </header>
      <div className="courses-container">
        <div className="courses-header">
          <h2>Courses</h2>
          <button className="create-course-button" onClick={() => navigate('/courseCreation')}>
            Create a New Course
          </button>
        </div>
        <div className="courses-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="course-card" onClick={() => handleCourseClick(course.id)}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                {course.videoUrl && (
                  <div className="course-video">
                    <video width="320" height="240" controls>
                      <source src={`http://localhost:5188/${course.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
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