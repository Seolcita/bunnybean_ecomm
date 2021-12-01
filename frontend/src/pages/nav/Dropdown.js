/** @format */

import React from 'react';
import firebase from 'firebase'; // To implement logout
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Component
import DropdownItem from './DropdownItem';

// CSS
import './dropdown.scss';

function Dropdown(props) {
  let dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <div className='dropdown'>
      <DropdownItem icon='👈'>
        <span>Dashboard</span>
      </DropdownItem>
      <DropdownItem icon='👉'>
        <span onClick={logout}>Logout</span>
      </DropdownItem>
    </div>
  );
}

export default Dropdown;
