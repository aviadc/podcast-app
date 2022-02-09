import React from 'react';
import { Link } from 'react-router-dom';
import "../css/navbar.css"
import logo from '../../img/brandPodco.JPG'

function MainNavbar() {
  return <div>
    <nav className='main-navbar'>
      <div className='main-navbar-inner-brand'>
        <img src={logo} alt='logo' height='90%' />
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
