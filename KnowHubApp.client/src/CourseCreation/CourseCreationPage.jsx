import React, { useState } from 'react';
import './CourseCreationPage.css';

const CourseCreationPage = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log({
      courseName,
      description,
      video,
    });
    alert('Course saved!');
  };

  const handlePublish = () => {
    console.log({
      courseName,
      description,
      video,
    });
    alert('Course published!');
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
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Course Description:</label>
          <textarea
            id="description"
            value={description}
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
          {video && <p className="file-upload-feedback">Uploaded: {video.name}</p>}
        </div>
        <div className="button-container">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationPage;
