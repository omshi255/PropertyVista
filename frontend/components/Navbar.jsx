import React, { useState } from 'react';
import Auth from '../src/Register';
import Authen from'./Authen'
import './Navbar.css';
import'./Auth.css'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeForm, setActiveForm] = useState('login'); // Toggle between login/register form

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <nav className="navbar">
      <div className="logo">Real Estate</div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#home" className="nav-item">Home</a></li>
        <li><a href="#properties" className="nav-item">Properties</a></li>
        <li><a href="#about" className="nav-item">About</a></li>
        <li><a href="#contact" className="nav-item"> Projects Gallery</a></li>
        <li><button className="nav-item login-btn" onClick={togglePopup}>Login / Register</button></li>
      </ul>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Popup for Login/Register */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={togglePopup}>X</button>
            <Authen />
          
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
