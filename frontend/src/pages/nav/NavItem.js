/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import './navItem.scss';

function NavItem(props) {
  const { icon, title, username, children } = props;
  const address = title.toLowerCase();

  const [open, setOpen] = useState(false);

  return (
    <div className="navItem" onClick={() => setOpen(!open)}>
      <li className="navItem__list">
        <Link to={`/${address}`} className="navItem__btn">
          <span className="navItem__btn--icon">{icon}</span>
          <span className="navItem__btn--title">
            {username ? username : title}
          </span>
        </Link>
        {open ? children : null}
      </li>
    </div>
  );
}

export default NavItem;
