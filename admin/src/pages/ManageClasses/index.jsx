import React, { useState } from 'react';
import './style.css';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  const handleAddClass = () => {
    // Function to add a new class
  };

  return (
    <div className="manage-classes-container">
      <h1>Manage Classes</h1>
      <button onClick={handleAddClass}>Add New Class</button>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
