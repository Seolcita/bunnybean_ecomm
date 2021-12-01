/** @format */

import React from 'react';

// Components
import UserSidebar from '../sidebar/UserSidebar';

//CSS
import './history.scss';

function OrderHistory() {
  return (
    <div className='history'>
      <div className='history__sidebar'>
        <UserSidebar />
      </div>
      <div className='history__detail'>Detail</div>
    </div>
  );
}

export default OrderHistory;
