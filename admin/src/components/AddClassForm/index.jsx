import React, { useState } from 'react';
import './style.css';

const AddClassForm = () => {
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="add-class-form">
      <h2>Add New Class</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClassForm;
