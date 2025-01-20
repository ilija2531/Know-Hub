import React, { useState } from 'react';
import './CourseCreationPage.css';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CourseCreationPage = () => {
  // State variables for course details
  const [CourseName, setCourseName] = useState('');
  const [Description, setDescription] = useState('');
  const [Video, setVideo] = useState(null);

  // Getting the token from AuthContext
  const { token } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle video file upload
  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]); // Set the selected video file
    }
  };

  // Function to handle publishing the course
  const handlePublish = async () => {
    // Ensure all fields are filled before proceeding
    if (!CourseName || !Description || !Video) {
      alert('Please fill in all fields and upload a video.');
      return;
    }

    // Creating a FormData object to send the course data
    const formData = new FormData();
    formData.append('Title', CourseName);
    formData.append('Description', Description);
    formData.append('CourseFile', Video);

    try {
      // Sending a POST request to upload the course
      const response = await fetch('http://localhost:5188/api/courses/uploadCourse', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: formData, // Include the form data
      });

      // Handle the response
      if (response.ok) {
        alert('Course published successfully!'); // Notify the user
        setCourseName('');
        setDescription('');
        setVideo(null); // Reset form inputs
        navigate('/home'); // Redirect to Home.jsx after success
      } else {
        const errorText = await response.text(); // Get error details from response
        alert(`Failed to publish course: ${errorText}`);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error('Error publishing course:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="course-creation-container">
      <h2>Create a New Course</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={CourseName}
            onChange={(e) => setCourseName(e.target.value)} // Update course name
            placeholder="Enter course name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Course Description:</label>
          <textarea
            id="description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)} // Update description
            placeholder="Enter course description"
            required
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="video">Course Video:</label>
          <input
            type="file"
            id="video"
            accept="video/*" // Restrict file type to videos
            onChange={handleVideoUpload}
          />
          {/* Display uploaded file name */}
          {Video && <p className="file-upload-feedback">Uploaded: {Video.name}</p>}
        </div>
        <div className="button-container">
          <button type="button" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationPage;
