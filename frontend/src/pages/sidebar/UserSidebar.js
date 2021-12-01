/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

// CSS & MUI icons
import './userSidebar.scss';
import {
  ReceiptLong,
  ShoppingBasket,
  Favorite,
  ManageAccounts,
} from '@mui/icons-material';

function UserSidebar() {
  return (
    <div className='userSidebar'>
      <Link to='/user/history'>
        <div className='userSidebar__option userSidebar__option--top'>
          <ReceiptLong className='userSidebar__icon' />
          Order History
        </div>
      </Link>
      <Link to='/user/cart'>
        <div className='userSidebar__option'>
          <ShoppingBasket className='userSidebar__icon' />
          Shopping Cart
        </div>
      </Link>
      <Link to='/user/wishlist'>
        <div className='userSidebar__option'>
          <Favorite className='userSidebar__icon' />
          Wishlist
        </div>
      </Link>
      <Link to='/user/account'>
        <div className='userSidebar__option '>
          <ManageAccounts className='userSidebar__icon' />
          User Account
        </div>
      </Link>
    </div>
  );
}

export default UserSidebar;
