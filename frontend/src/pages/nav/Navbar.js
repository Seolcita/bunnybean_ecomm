/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'; // To implement logout

// Components
import NavItem from './NavItem';
import Dropdown from './Dropdown';

//CSS & MUI
import { Login } from '@mui/icons-material';
import { Modal } from '@mui/material';
import logo from '../../images/logo.png';
import './navbar.scss';

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <Link to="/" className="navbar__logo">
          <img className="navbar__logo--img" src={logo} alt="logo" />
          <h1 className="navbar__logo--title"> Bunnybean Shop </h1>
        </Link>
        <ul className="navbar__ul">
          <NavItem icon={<Login />} title="Login" />
          <NavItem icon="🥰" title="Register" />
          <NavItem icon={<Login />} title="User">
            {/* Dropdown */}
            <Dropdown />
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
