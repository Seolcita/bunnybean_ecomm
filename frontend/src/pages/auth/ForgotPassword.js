/** @format */

import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ForgotPassword(props) {
  const { history } = props;
  const { user } = useSelector((state) => ({ ...state }));

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success(`Reset password link sent to ${email}`);
      })
      .catch((err) => {
        console.log('ERR', err);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="register">
      <div className="register__container">
        {loading ? (
          <h1 className="register__title">Loading...</h1>
        ) : (
          <h1 className="register__title">Forgot Password</h1>
        )}

        <div className="register__form">
          <input
            className="register__input"
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="register__btn"
            type="submit"
            disabled={!email}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
