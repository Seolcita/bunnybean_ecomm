/** @format */

import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Components
import UserSidebar from '../sidebar/UserSidebar';
import AdminSidebar from '../sidebar/AdminSidebar';

//CSS
import './account.scss';
import { Menu } from '@mui/icons-material';

function Account() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  let { user } = useSelector(state => ({ ...state }));

  // CSS Responsive Purpose
  const [mobile, setMobile] = useState('0rem');
  const [filterToggle, setFilterToggle] = useState(false);

  const handleFilterToggle = () => {
    console.log('CLICKED TOGGLE');
    setFilterToggle(!filterToggle);
    console.log('TOGGLE', filterToggle);

    if (filterToggle) {
      setMobile('0rem');
      console.log('current toggle', filterToggle);
    } else if (!filterToggle) {
      setMobile('-24rem');
      console.log('current toggle', filterToggle);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('Password Updated');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className='account'>
      <div className='account__sidebar' style={{ marginLeft: mobile }}>
        <label id='ToggleSidebar'>
          <input
            type='checkbox'
            id='ToggleSidebar--input'
            for='ToggleSidebar'
          />
          <Menu id='ToggleSidebar--icon' onClick={() => handleFilterToggle()} />
        </label>
        {user?.role === 'admin' ? <AdminSidebar /> : <UserSidebar />}
      </div>
      <div className='account__detail'>
        <div className='account__wrap'>
          <h2 className='dashboard__title--main'> Hello, {user.name}</h2>
          <form className='account__form' onSubmit={handleSubmit}>
            {user?.role === 'admin' ? <h3>Admin ID </h3> : <h3>User ID </h3>}
            <h4>
              <i>{user.email}</i>
            </h4>
            <h3>Update Password </h3>
            <input
              type='password'
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter new password'
              disabled={loading}
              value={password}
            />
            <input
              type='password'
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder='Confirm the new password'
              disabled={loading}
              value={confirmPassword}
            />
            <button
              className='account__btn'
              disabled={
                !password ||
                password.length < 6 ||
                password !== confirmPassword ||
                loading
              }
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
