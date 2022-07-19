import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom'
import "./navbar.scss";

const Navbar = () => {


  const [hamburgerClick, setHamburgerClick] = useState(false);

  return (
    <nav className='navbar-container'>
      <div className={hamburgerClick ? "nav-menu active" : "nav-menu"}>
        <div>
          <Link
            to='/'
            className='nav-link'
            onClick={() => setHamburgerClick(!hamburgerClick)}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to='/podcasts'
            className='nav-link'
            onClick={() => setHamburgerClick(!hamburgerClick)}
          >
            Podcasts
          </Link>
        </div>
        <div>
          <Link
            to='/profile'
            className='nav-link'
            onClick={() => setHamburgerClick(!hamburgerClick)}
          >
            Profile
          </Link>
        </div>

      </div>
      <div
        className='navbar-hamburger'
        onClick={() => setHamburgerClick(!hamburgerClick)}
      >
        {hamburgerClick ? (
          <FaTimes size={30} style={{ color: "#ffffff" }} />
        ) : (
          <FaBars size={30} style={{ color: "#ffffff" }} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
