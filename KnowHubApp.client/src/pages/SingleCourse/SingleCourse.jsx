import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import './SingleCourse.css';

const SingleCourse = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5188/api/courses/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          console.error('Failed to fetch course details');
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id, token]);

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="single-course-container">
      <div className="course-header">
        <h1>{course.title}</h1>
      </div>
      <div className="course-description">
        <p>{course.description}</p>
      </div>
      {course.videoUrl && (
        <div className="video-container">
          <video controls>
            <source src={`http://localhost:5188/${course.videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
