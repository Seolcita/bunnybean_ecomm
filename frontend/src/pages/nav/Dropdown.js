/** @format */

import React, { useState } from 'react';

// Component
import DropdownItem from './DropdownItem';

// CSS
import './dropdown.scss';

function Dropdown() {
  return (
    <div className="dropdown">
      <DropdownItem icon="👈">
        <span>Title 1</span>
      </DropdownItem>
      <DropdownItem icon="👉">
        <span>Title 2</span>
      </DropdownItem>
    </div>
  );
}

export default Dropdown;
