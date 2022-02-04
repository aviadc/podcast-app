import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css"

function MainNavbar() {
  return <div>
    <nav className='main-navbar'>
      <Link to="/">HOME</Link>
      <Link to="/podcasts">PODCASTS</Link>
      <Link to="/profile">PROFILE</Link>
      <Link to="/about">ABOUT</Link>
    </nav>
  </div>;
}

export default MainNavbar;
