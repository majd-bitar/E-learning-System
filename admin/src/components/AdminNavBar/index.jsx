import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../base/Button/index.jsx';

const AdminNavBar = () => {
  const handleLogout = ()=>{
    localStorage.clear();
    nav('/login');
}
const nav = useNavigate();
  return (
    <nav className="admin-nav-bar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/manage-classes">Manage Classes</Link></li>
        <li><Link to="/manage-students">Manage Students</Link></li>
        <li><Link to="/file-upload">File Upload</Link></li>
        <li><Link to="/withdrawal-requests">Withdrawal Requests</Link></li>
        <Button text={'Log out'} className="logout-button" onClick={handleLogout}></Button>
      </ul>
    </nav>
  );
};
export default AdminNavBar;
