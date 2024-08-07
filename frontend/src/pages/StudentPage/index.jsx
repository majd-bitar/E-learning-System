import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import AvailableClasses from './AvailableClasses';
import EnrolledClasses from './EnrolledClasses';
import './style.css';
import { fetchUserSuccess } from '../../redux/usersSlice';
import { requestApi } from '../../utils/request';
import { RequestMethods } from '../../utils/request_methods';

const StudentPage = () => {
    const [classes, setClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //read the userState with useSelector
    //const userState = useSelector((global)=>global.users);
    //console.log(userState);

    //to call actions on our slice
    //const dispatch = useDispatch();
    //call dispatch passing in its parameter the action i want to call
    //dispatch(fetchUserSuccess('testing'));

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await requestApi({
                    route: '/student/classes',
                    requestMethod: RequestMethods.GET,
                    navigationFunction: navigate, // Pass navigate function here
                });
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        const fetchEnrolledClasses = async () => {
            try {
                
                const data = await requestApi({
                    route: '/student/enrolled-classes',
                    requestMethod: RequestMethods.GET,
                    navigationFunction: navigate, // Pass navigate function here
                });
                setEnrolledClasses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching enrolled classes:', error);
                setLoading(false);
            }
        };

        fetchClasses();
        fetchEnrolledClasses();
    }, [navigate]);

    const handleEnroll = async (classID) => {
        try {
            const token = localStorage.getItem('user-token');
            await fetch(`http://localhost:8080/api/student/enroll/${classID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEnrolledClasses((prev) => [...prev, classes.find(c => c._id === classID)]);
        } catch (error) {
            console.error('Error enrolling in class:', error);
        }
    };

    const handleWithdraw = async (classID) => {
        try {
            const token = localStorage.getItem('user-token');
            const response = await fetch(`http://localhost:8080/api/student/withdraw/${classID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Withdrawal successful:', data);
    
            // Update state after withdrawal
            setEnrolledClasses((prev) => prev.filter(c => c._id !== classID));
        } catch (error) {
            console.error('Error withdrawing from class:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="available-classes"
                    element={
                        <AvailableClasses
                            classes={classes}
                            enrolledClasses={enrolledClasses}
                            handleEnroll={handleEnroll}
                            navigate={navigate}
                        />
                    }
                />
                <Route
                    path="enrolled-classes"
                    element={
                        <EnrolledClasses
                            enrolledClasses={enrolledClasses}
                            handleWithdraw={handleWithdraw}
                            navigate={navigate}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default StudentPage;
