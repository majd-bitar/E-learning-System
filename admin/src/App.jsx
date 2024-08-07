import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminNavBar from './components/AdminNavBar/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import ManageClasses from './pages/ManageClasses/index.jsx';
import ManageStudents from './pages/ManageStudents/index.jsx';
import FileUpload from './pages/FileUpload/index.jsx';
import WithdrawalRequests from './pages/WithdrawalRequests/index.jsx';
import './styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AdminNavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-classes" element={<ManageClasses />} />
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/withdrawal-requests" element={<WithdrawalRequests />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
