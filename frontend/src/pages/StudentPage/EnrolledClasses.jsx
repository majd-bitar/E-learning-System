import React from 'react';
import Button from '../../base/Button'; // Assuming Button component exists

const EnrolledClasses = ({ enrolledClasses, handleWithdraw, navigate }) => {
    return (
        <div>
            <h1>Enrolled Classes</h1>
            <div className="enrolled-classes-container">
                {enrolledClasses.length > 0 ? (
                    enrolledClasses.map((classItem) => (
                        <div key={classItem._id} className="enrolled-class-card">
                            <h3>{classItem.name}</h3>
                            <p>{classItem.description}</p>
                            <div className='flex row gap'> 
                                <Button text={'View More'} onClick={() => navigate(`/class/${classItem._id}`)}></Button>
                                <Button text={'Withdraw'} onClick={() => {console.log('Withdraw button clicked');handleWithdraw(classItem._id)}}></Button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>You are not enrolled in any classes.</p>
                )}
            </div>
        </div>
    );
};

export default EnrolledClasses;
