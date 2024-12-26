import React from 'react';
import './Welcome.css';


const Welcome = () => {
    return (
        
      <div className="welcome-container">
        <header className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Knowhub</h1>
            <p className="hero-subtitle">
              The ultimate Learning Management System designed to empower you.
            </p>
            <p className="hero-description">
              Whether you're a student, educator, or professional, Knowhub provides the tools to enhance your learning experience. Join us today to start your journey toward success!
            </p>
          </div>
        </header>
  
        <main className="main-content">
          {/* Features Section */}
          <section className="features">
            <h2 className="section-title">Our Features</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <h3>📘 Learn at Your Own Pace</h3>
                <p>Access interactive lessons, quizzes, and tutorials at any time and from anywhere, allowing you to learn at your own speed. Whether you prefer to learn in small chunks or dive into longer sessions, Knowhub adapts to your pace.</p>
              </div>
              <div className="feature-card">
                <h3>🧑‍🏫 Expert Instructors</h3>
                <p>Learn from top-rated educators with years of experience in their fields. Our instructors are passionate about teaching and are committed to providing high-quality content that makes complex subjects easier to understand.</p>
              </div>
              <div className="feature-card">
                <h3>🌐 Connect with Peers</h3>
                <p>Engage in discussions, share ideas, and collaborate on projects with learners from all around the faculty. Knowhub fosters a vibrant community where learning extends beyond the classroom and into real-world applications.</p>
              </div>
            </div>
          </section>
  
          {/* Why Choose Knowhub */}
          <section className="why-choose">
            <h2 className="section-title">Why Choose Knowhub?</h2>
            <p>We are committed to providing the best online learning experience tailored to your needs. Here’s why you should choose Knowhub for your educational journey:</p>
            <ul>
              <li>Personalized learning paths that cater to your goals.</li>
              <li>Easy-to-use platform for a seamless, distraction-free experience.</li>
              <li>Access to a global network of educators and students for diverse perspectives.</li>
              <li>Interactive and engaging content designed to keep you motivated.</li>
            </ul>
          </section>
  
          {/* Clear the Get Started Section */}
          {/* <section className="get-started">
            <h2 className="section-title">Get Started with Knowhub</h2>
            <p>Ready to take your learning to the next level? Join Knowhub today and gain access to a world-class educational platform that will help you achieve your learning goals. Whether you're looking to learn new skills, advance your career, or simply explore new subjects, Knowhub has everything you need.</p>
            <button className="cta-button">Sign Up Now</button>
          </section> */}
  
          {/* Services Section */}
          <section className="services">
            <h2 className="section-title">Our Services</h2>
            <div className="service-cards">
              <div className="service-card">
                <h3>🎓 Course Creation</h3>
                <p>We provide you with everything you need to design and launch your own courses with minimal effort. Our tools make it easy to create engaging, interactive lessons that are simple to share with a global audience.</p>
              </div>
              <div className="service-card">
                <h3>🛠️ Course Customization Tools</h3>
                <p>Unlock the power of flexibility with Knowhub's intuitive course customization tools. Whether you're creating a course for beginners or advanced learners, our platform allows you to easily adjust lesson content, pace, and assessments to suit the unique needs of your audience.



</p>
              </div>
              <div className="service-card">
                <h3>💬 Support</h3>
                <p>Our dedicated support team is available 24/7 to help you with any issues you encounter. Whether it's technical assistance or learning advice, we're here to help you succeed.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

export default Welcome