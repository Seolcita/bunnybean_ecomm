/** @format */

import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../connections/auth';

// CSS
import './register.scss';

const RegisterComplete = props => {
  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // console.log('LS', window.localStorage.getItem('emailForRegistration'));
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log('RESULT >>', result);

      // Remove user email from local storage
      window.localStorage.removeItem('emailForRegistration');

      // Get user info from firebase & set password
      let user = auth.currentUser;
      await user.updatePassword(password);

      // Get user id token
      const idTokenResult = await user.getIdTokenResult();

      // Redux Store
      // console.log("USER", user, "idTokenResult", idTokenResult);
      createOrUpdateUser(idTokenResult.token)
        .then(res => {
          console.log('CREATE OR UPDATE USER RES ---', res);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch(err => console.log(err));
      // Redirect
      history.push('/');
    } catch (err) {
      console.log('ERROR >>', err);
      toast.error(err.message);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='register'>
      <div className='register__container'>
        <h1 className='register__title'>Complete Registration</h1>
        <div className='register__form'>
          <input
            className='register__input'
            type='email'
            placeholder='Email'
            value={email}
            disabled
          />
          <input
            className='register__input'
            type='password'
            placeholder='password'
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className='register__btn submit'
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

export default RegisterComplete;
