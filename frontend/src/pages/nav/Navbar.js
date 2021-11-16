/** @format */

import React, { useState } from 'react';

// Components
import NavItem from './NavItem';
import Dropdown from './Dropdown';

//CSS
import './navbar.scss';

function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <h1>LOGO</h1>
        <ul className="navbar__ul">
          <NavItem icon="🥰" />
          <NavItem icon="😜" />
          <NavItem icon="😁">
            {/* Dropdown */}
            <Dropdown />
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
