/** @format */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'firebase'; // To implement logout
import { useDispatch } from 'react-redux';

// Components
import NavItem from './NavItem';
import Dropdown from './Dropdown';
import ProductSearch from '../../components/forms/ProductSearch';

//CSS & MUI
import {
  StoreMallDirectory,
  Login,
  Person,
  Logout,
  ShoppingBasket,
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
        <div className='navbar__section left'>
          <Link to='/' className='navbar__logo'>
            <img className='navbar__logo--img' src={logo} alt='logo' />
            <h1 className='navbar__logo--title'> The Buy </h1>
          </Link>
          <Link to='/shop'>
            <h3 className='navbar__shop'>
              <StoreMallDirectory className='navbar__shop--icon' />
              Shop
            </h3>
          </Link>
        </div>
        <div className='navbar__section middle'>
          <ProductSearch className='navbar__search' />
        </div>
        <div className='navbar__section right'>
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
                  title='Cart'
                  address='cart'
                ></NavItem>
                <div className='navbar__logout' onClick={() => logout()}>
                  <Logout className='navbar__icon logout' />{' '}
                  <small>Logout</small>
                </div>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
