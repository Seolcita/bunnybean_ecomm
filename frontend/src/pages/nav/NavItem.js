/** @format */

import React, { useState } from 'react';

//CSS
import './navItem.scss';

function NavItem(props) {
  const { icon, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="navItem">
      <li className="navItem__list" onClick={() => setOpen(!open)}>
        <a href="#" className="navItem__btn">
          {icon}
        </a>
        {open ? children : null}
      </li>
    </div>
  );
}

export default NavItem;
