/** @format */

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'firebase'; // To implement logout
import { useDispatch } from 'react-redux';

// Components
import NavItem from './NavItem';
import ProductSearch from '../../components/forms/ProductSearch';

//CSS & MUI
import {
  StoreMallDirectory,
  Login,
  Person,
  Logout,
  ShoppingBasket,
  Home,
} from '@mui/icons-material';
import logo from '../../images/logo.png';
import './navbar.scss';
// import { Modal } from '@mui/material';

function Navbar() {
  let { user } = useSelector(state => ({ ...state }));
  const history = useHistory();
  let dispatch = useDispatch();

  // CSS Purpose
  const [mobile, setMobile] = useState('none');
  const [laptop, setLaptop] = useState('block');
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  // CSS RESPONSIVE - Check window inner width and change nav
  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResponsive();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentWidth]);

  const handleResponsive = () => {
    if (currentWidth < 768) {
      setMobile('block');
      setLaptop('none');
    } else if (currentWidth >= 768) {
      setMobile('none');
      setLaptop('block');
    }
  };

  // console.log('currentWidth', currentWidth);
  // console.log('MOBILE', mobile);
  // console.log('LAPTOP', laptop);

  const logout = () => {
    // Remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    // Remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });

    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <div className='navigation'>
      {/* FOR DESKTOP & LAPTOP */}
      <div className='navbar' style={{ display: laptop }}>
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
              <NavItem
                icon={<ShoppingBasket className='navbar__icon' />}
                title='Cart'
                address='cart'
                badge
              ></NavItem>
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
                      user?.role === 'admin'
                        ? 'admin/dashboard'
                        : 'user/history'
                    }
                    username={user.email?.split('@')[0]}
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

      {/* FOR TABLET & MOBILE */}
      <div className='mobile-navbar' style={{ display: mobile }}>
        <nav className='mobile-navbar__nav '>
          <div className='mobile-navbar__section--top'>
            <ProductSearch className='navbar__search' />
          </div>
          <div className='mobile-navbar__section--bottom'>
            <Link to='/'>
              <Home className='mobile-navbar__home--icon' />
            </Link>
            <Link to='/shop'>
              <h3 className='navbar__shop'>
                <StoreMallDirectory className='mobile-navbar__shop--icon' />
              </h3>
            </Link>
            <ul className='navbar__ul'>
              <NavItem
                icon={<ShoppingBasket className='navbar__icon' />}
                title=''
                address='cart'
                badge
              ></NavItem>
              {!user ? (
                <NavItem
                  icon={<Login className='navbar__icon' />}
                  title=''
                  address='login'
                />
              ) : (
                <>
                  <NavItem
                    icon={<Person className='navbar__icon' />}
                    title=''
                    address={
                      user?.role === 'admin'
                        ? 'admin/dashboard'
                        : 'user/history'
                    }
                  ></NavItem>

                  <div className='navbar__logout' onClick={() => logout()}>
                    <Logout className='navbar__icon logout' />{' '}
                  </div>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
