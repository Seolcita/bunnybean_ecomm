/** @format */

import React from 'react';

// CSS
import './dropdownItem.scss';

function DropdownItem(props) {
  const { children, icon } = props;

  return (
    <div className="dropdownItem">
      <span className="dropdownItem__icon">{icon}</span>
      {children}
    </div>
  );
}

export default DropdownItem;
