import React from 'react';
import Button from '../../base/Button'
const AvailableClasses = ({ classes, enrolledClasses, handleEnroll, navigate }) => {
    
    //filter the enrolled classes from all classes to get the available
    const enrolledClassIds = new Set(enrolledClasses.map(enrolled => enrolled._id));
    const filteredClasses = classes.filter(
        classItem => !enrolledClassIds.has(classItem._id)
    );

    return (
        <div>
            <h1>Available Classes</h1>
            <div className="classes-container">
                {filteredClasses.length > 0 ? (
                    filteredClasses.map((classItem) => (
                        <div key={classItem._id} className="class-card">
                            <h3>{classItem.name}</h3>
                            <p>{classItem.description}</p>
                            <div className='flex row gap'> 
                                <Button text='View More'  onClick={() => navigate(`/class/${classItem._id}`)}></Button>
                                <Button text='Enroll' onClick={() => handleEnroll(classItem._id)}></Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No available classes to enroll in.</p>
                )}
            </div>
        </div>
    );
};

export default AvailableClasses;
