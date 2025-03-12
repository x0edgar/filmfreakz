import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  // Escucha los cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Maneja el cierre de sesión
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload(); // Recargar la página después de cerrar sesión
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-box">
          <img
            src={user.photoURL || '/path-to-default-avatar.png'}
            alt="Profile"
            className="profile-avatar"
          />
          <h2>Welcome, {user.displayName || user.email}</h2>
          <p>Email: {user.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="profile-box">
          <h2>You are not logged in</h2>
          <p className="litsyp">Please log in to see your profile.</p>
          <Link to="/login" className="login-button">Log In</Link>
          <p className="signup-text">Don't have an account?</p>
          <Link to="/login" className="signup-link">Sign up here</Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
