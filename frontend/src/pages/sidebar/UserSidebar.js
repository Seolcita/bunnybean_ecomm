/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

// CSS & MUI icons
import './sidebar.scss';
import {
  ReceiptLong,
  ShoppingBasket,
  Favorite,
  ManageAccounts,
} from '@mui/icons-material';

function UserSidebar() {
  return (
    <div className='sidebar'>
      <Link to='/user/history'>
        <div className='sidebar__option sidebar__option--top'>
          <ReceiptLong className='sidebar__icon' />
          Order History
        </div>
      </Link>

      {/* <Link to='/user/wishlist'>
        <div className='sidebar__option'>
          <Favorite className='sidebar__icon' />
          Wishlist
        </div>
      </Link> */}
      <Link to='/user/account'>
        <div className='sidebar__option '>
          <ManageAccounts className='sidebar__icon' />
          User Account
        </div>
      </Link>
      <Link to='/cart'>
        <div className='sidebar__option'>
          <ShoppingBasket className='sidebar__icon' />
          Shopping Cart
        </div>
      </Link>
    </div>
  );
}

export default UserSidebar;
