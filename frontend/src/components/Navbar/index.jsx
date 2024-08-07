import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
import { useNavigate } from 'react-router-dom';
import Button from '../../base/Button';

const Navbar = () => {

const nav = useNavigate();

const handleLogout = ()=>{
    localStorage.clear();
    nav('/login');
}
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="available-classes" className="nav-link">Available Classes</Link>
                <Link to="enrolled-classes" className="nav-link">Enrolled Classes</Link>
            </div>
    <Button text={'Log out'} className="logout-button" onClick={handleLogout}></Button>
</nav>

    );
};

export default Navbar;
