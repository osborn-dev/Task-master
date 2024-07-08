import React, { useState } from 'react';
import '../styles/hambugerStyle.css'

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className={`hamburger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      {isOpen && (
        <div className="menu">
          <a href="#About">About</a>
          <a href="#Task History">History</a>
          <a href="#Motivation">Motivation</a>
          <a href="#Profile">Profile</a>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
