/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

//CSS
import '../../app.scss';
import './login.scss';
import './register.scss';

const Login = (props) => {
  const { history } = props;

  const [email, setEmail] = useState('sseori30@gmail.com');
  const [password, setPassword] = useState('seol1111');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user?.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // After login, firebase returns user info
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log('result ****', result);
      const { user } = result;
      const idTokenResult = user.getIdTokenResult;

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push('/');
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setLoading(false);
    }

    // setEmail('');
    // setPassword('');
  };

  const googleLogin = () => {
    setLoading(true);

    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
        const { user } = result;
        const idTokenResult = user.getIdTokenResult();

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="register">
      <div className="register__container">
        {loading ? (
          <h1 className="register__title">Loading</h1>
        ) : (
          <h1 className="register__title">Login</h1>
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
          <input
            className="register__input"
            type="password"
            placeholder="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            className="register__btn"
            type="submit"
            onClick={handleSubmit}
            disabled={!email || password.length < 6}
          >
            Login with Email &amp; Password
          </button>
          <div>
            <Link to="/forgot/password">Forgot password?</Link>
          </div>
          <br />
          <button
            className="register__btn"
            type="submit"
            onClick={googleLogin}
            disabled={!email || password.length < 6}
          >
            Google Login
          </button>
          <div className="register__link">
            <p>
              New customer?
              <a href="/register">Start here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
