import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="navbar-bg">
      <div className="navbar-container">
        <div className="title-container">
          <Link to="/" className="navbar-title">
            <img src="/vite.svg" alt="Logo" className="logo" />
            <h1>TuilesGames</h1>
          </Link>
          <span className="phrase">Explorez l'univers des jeux vidéo, une tuile à la fois.</span>
        </div>
        <nav className="navbar-nav">
          {user ? (
            <div className="user-info-container">
              <div className="user-info-box">
                <span className="user-username">{user.username}</span>
                <div className="separator"></div>
                <span className="user-email">{user.email}</span>
              </div>
              <button onClick={handleClick} className="logout-button">
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">
                Connexion
              </Link>
              <Link to="/signup" className="auth-link">
                Inscription
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
