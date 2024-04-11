import React, { useState } from "react";

import './Header.css';


const Header = ({ user, onProfileClick, onLogoutClick }) => {
    return (
        <header className="header">
        <div className="user-info">
          {user && (
            <div>
              <span>Welcome {user}</span>
              <span>{user.email}</span>
            </div>
          )}
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-button" onClick={onProfileClick}>Perfil</button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={onLogoutClick}>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;