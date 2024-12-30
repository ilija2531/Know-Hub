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
        <main className="home-main">
          <section className="home-section">
            <h3>Programming Courses</h3>
            <p>Explore courses to enhance your coding skills.</p>
          </section>
          <section className="home-section">
            <h3>Sports Courses</h3>
            <p>Discover ways to stay active and fit.</p>
          </section>
          <section className="home-section">
            <h3>Language Courses</h3>
            <p>Learn new languages and expand your communication skills.</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
