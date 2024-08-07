import React, { useState } from 'react';
import './style.css';

const WithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);

  const handleApprove = (requestId) => {
    // Function to approve withdrawal
  };

  const handleReject = (requestId) => {
    // Function to reject withdrawal
  };

  return (
    <div className="withdrawal-requests-container">
      <h1>Withdrawal Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.studentName} - {request.className}
            <button onClick={() => handleApprove(request.id)}>Approve</button>
            <button onClick={() => handleReject(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WithdrawalRequests;
