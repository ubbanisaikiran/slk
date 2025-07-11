import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import img2 from '../../src/images/favicon.jpg'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={img2} alt="logo" className="logo" />
      </div>

      <nav className="header-center">
        <Link to="/home">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      <div className="header-right">
        <div className="profile-dropdown">
          <button className="profile-btn">Logout ▾</button>
          <div className="dropdown-content">
            <button onClick={handleLogout}>Yes, Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
