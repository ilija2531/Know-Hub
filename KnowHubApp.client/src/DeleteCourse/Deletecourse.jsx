import './DeleteCourse.css';
import React, { useState } from "react";

const DeleteCourse = ({ courseId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      // Тука можеш да ја повикаш функцијата за бришење
      // Пример: await deleteCourseFromServer(courseId);

      // Кога е успешно, ја викаш onDelete пропс функцијата за да ја освежиш листата
      onDelete(courseId);
      setIsDeleting(false);
    } catch (err) {
      setError("Се појави грешка при бришење.");
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="delete-button"
      >
        {isDeleting ? "Бришење..." : "Избриши курс"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DeleteCourse;