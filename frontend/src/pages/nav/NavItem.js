/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// CSS
import './navItem.scss';

function NavItem(props) {
  const { icon, title, username, address, children } = props;
  const { cart } = useSelector(state => ({ ...state }));
  const [open, setOpen] = useState(false);

  return (
    <div className='navItem' onClick={() => setOpen(!open)}>
      <li className='navItem__list'>
        <Link to={`/${address}`} className='navItem__btn'>
          <span className='navItem__btn--icon'>{icon}</span>
          <span className='navItem__btn--title'>
            {username ? username : title}
          </span>
          {title === 'Cart' && (
            <span className='navItem__count'>{cart.length}</span>
          )}
        </Link>
        {open ? children : null}
      </li>
    </div>
  );
}

export default NavItem;
