/** @format */

import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// CSS
import './register.scss';

const Register = props => {
  const { history } = props;

  const [email, setEmail] = useState('');

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user?.token) history.push('/');
  }, [user, history]);

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('ENV', process.env.REACT_APP_REGISTER_REDIRECT_URL);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    window.localStorage.setItem('emailForRegistration', email);

    setEmail('');
  };

  return (
    <div className='register'>
      <div className='register__container'>
        <h1 className='register__title'>Register</h1>
        <div className='register__form'>
          <input
            className='register__input'
            type='email'
            placeholder='Email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className='register__btn'
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
