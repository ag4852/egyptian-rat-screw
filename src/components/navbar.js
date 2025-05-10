import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/learn">Learn</Link></li>
        <li><Link to="/practice">Practice</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
