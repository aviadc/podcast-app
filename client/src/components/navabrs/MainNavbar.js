import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css"

function MainNavbar() {
  return <div>
    <nav className='main-navbar'>
      <div className='main-navbar-inner-brand'>
        <div></div>
      </div>
      <div className='main-navbar-inner-links' >
        <Link to="/">HOME</Link>
        <Link to="/podcasts">PODCASTS</Link>
        <Link to="/profile">PROFILE</Link>
        <Link to="/about">ABOUT</Link>
      </div>
    </nav>
  </div>;
}

export default MainNavbar;
