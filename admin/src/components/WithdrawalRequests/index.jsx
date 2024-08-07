import React, { useEffect, useState } from 'react';
import './style.css';

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch withdrawal requests from API
  }, []);

  const handleApprove = (id) => {
    // Handle request approval
  };

  const handleReject = (id) => {
    // Handle request rejection
  };

  return (
    <div className="withdrawal-requests">
      <h2>Withdrawal Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.studentName} - {request.courseName}
            <button onClick={() => handleApprove(request.id)}>Approve</button>
            <button onClick={() => handleReject(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WithdrawalRequests;
