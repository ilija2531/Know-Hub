import React, { useState, useContext } from 'react';
import './CourseCreationPage.css';
import { AuthContext } from '../AuthContext/AuthContext'; // Corrected path

const CourseCreationPage = () => {
  const [CourseName, setCourseName] = useState('');
  const [Description, setDescription] = useState('');
  const [Video, setVideo] = useState(null);
  const { token } = useContext(AuthContext); // Using context to get the token

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!CourseName || !Description) {
      alert('Please fill in all the fields and upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', CourseName);
    formData.append('Description', Description);
    formData.append('CourseFile', Video);

    try {
      const response = await fetch('http://localhost:5188/api/courses/uploadCourse', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Sending token in the request header
        },
        body: formData,
      });

      if (response.ok) {
        alert('Course published successfully!');
      } else {
        alert('Failed to publish course. Please try again.');
      }
    } catch (error) {
      console.error('Error publishing course:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="course-creation-container">
      <h2>Create a New Course</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={CourseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Course Description:</label>
          <textarea
            id="description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
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
            accept="video/*"
            onChange={handleVideoUpload}
          />
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
