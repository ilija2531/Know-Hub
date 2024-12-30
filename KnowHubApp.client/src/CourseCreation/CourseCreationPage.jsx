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

  const handlePublish = async () => {
    if (!courseName || !description) {
      alert('Please fill in all the fields and upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', courseName);
    formData.append('Description', description);
    formData.append('CourseFile', video);

    try {
      const response = await fetch('/api/courses/uploadCourse', {
        method: 'POST',
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
          <button
            type="button"
            onClick={() => {
              console.log({
                courseName,
                description,
                video,
              });
              alert('Course saved!');
            }}
          >
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
