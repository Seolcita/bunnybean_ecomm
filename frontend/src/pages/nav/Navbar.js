/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import NavItem from './NavItem';
import Dropdown from './Dropdown';

//CSS & MUI
import { Login, Person } from '@mui/icons-material';
import logo from '../../images/logo.png';
import './navbar.scss';
// import { Modal } from '@mui/material';

function Navbar() {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <Link to="/" className="navbar__logo">
          <img className="navbar__logo--img" src={logo} alt="logo" />
          <h1 className="navbar__logo--title"> Bunnybean Shop </h1>
        </Link>
        <ul className="navbar__ul">
          {!user ? (
            <NavItem icon={<Login />} title="Login" />
          ) : (
            <NavItem
              icon={<Person />}
              title="User"
              username={user.email?.split('@')[0]}
            >
              <Dropdown />
            </NavItem>
          )}

          {/* <NavItem icon="🥰" title="Register" /> */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
