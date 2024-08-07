import React, { useState } from 'react';
import './style.css';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  const handleViewStudent = (studentId) => {
    // Function to view student details
  };

  return (
    <div className="manage-students-container">
      <h1>Manage Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} <button onClick={() => handleViewStudent(student.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;
