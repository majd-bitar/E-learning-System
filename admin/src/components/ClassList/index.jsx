import React, { useEffect, useState } from 'react';
import './style.css';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes from API
  }, []);

  return (
    <div className="class-list">
      <h2>Class List</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>{cls.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
