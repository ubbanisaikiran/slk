import React from 'react';
import './Header.css';
import img2 from '../../src/images/favicon.jpg';
import { useNavigate } from 'react-router-dom';

const Header = ({ setActiveTab }) => {
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
        <button className="nav-btn" onClick={() => setActiveTab('search')}>Search</button>
        <button className="nav-btn" onClick={() => setActiveTab('scraping')}>Web Scraping</button>
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
