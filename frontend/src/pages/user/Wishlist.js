/** @format */

import React from 'react';

// Components
import UserSidebar from '../sidebar/UserSidebar';

//CSS

import './wishlist.scss';

function Wishlist() {
  return (
    <div className='wishlist'>
      <div className='wishlist__sidebar'>
        <UserSidebar />
      </div>
      <div className='wishlist__detail'>wishlist</div>
    </div>
  );
}

export default Wishlist;
