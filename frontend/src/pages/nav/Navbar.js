/** @format */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'firebase'; // To implement logout
import { useDispatch } from 'react-redux';

// Components
import NavItem from './NavItem';
import Dropdown from './Dropdown';

//CSS & MUI
import {
  Login,
  Person,
  Logout,
  ShoppingBasket,
  ShoppingCart,
} from '@mui/icons-material';
import logo from '../../images/logo.png';
import './navbar.scss';
// import { Modal } from '@mui/material';

function Navbar() {
  let { user } = useSelector(state => ({ ...state }));
  const history = useHistory();
  let dispatch = useDispatch();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <div className='navbar'>
      <nav className='navbar__nav'>
        <Link to='/' className='navbar__logo'>
          <img className='navbar__logo--img' src={logo} alt='logo' />
          <h1 className='navbar__logo--title'> Bunnybean Shop </h1>
        </Link>
        <ul className='navbar__ul'>
          {!user ? (
            <NavItem
              icon={<Login className='navbar__icon' />}
              title='Login'
              address='login'
            />
          ) : (
            <>
              <NavItem
                icon={<Person className='navbar__icon' />}
                title=''
                address={
                  user?.role === 'admin' ? 'admin/dashboard' : 'user/history'
                }
                username={user.email?.split('@')[0]}
              >
                {/* <Dropdown /> */}
              </NavItem>
              <NavItem
                icon={<ShoppingBasket className='navbar__icon' />}
                title='cart'
                address='cart'
              ></NavItem>
              <div className='navbar__logout' onClick={() => logout()}>
                <Logout className='navbar__icon' /> <small>Logout</small>
              </div>
            </>
          )}

          {/* <NavItem icon="🥰" title="Register" /> */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
