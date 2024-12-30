import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const navigateToCourseCreation = () => {
    navigate('/courseCreation');
  };

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
      </div>
    </div>
  );
};

export default Home;