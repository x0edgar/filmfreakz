import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>FilmFreakz</span>
      </div>
      
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/search">Search Movies</Link>
        <Link to="/login">Login</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
