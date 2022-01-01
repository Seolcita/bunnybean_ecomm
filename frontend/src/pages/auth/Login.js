/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../connections/auth';

//CSS
import './login.scss';
import './register.scss';

const Login = props => {
  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user?.token) history.push('/');
  }, [user, history]);

  const roleBasedRedirect = res => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      // After login, firebase returns user info
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log('result ****', result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // Once I get a token from firebase,
      // I send this to backend to check if it is valid token or not.
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
          roleBasedRedirect(res);
        })
        .catch(err => console.log(err));

      // history.push("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setLoading(false);
    }

    // setEmail('');
    // setPassword('');
  };

  const googleLogin = async () => {
    setLoading(true);

    auth
      .signInWithPopup(googleProvider)
      .then(async result => {
        console.log(result);
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then(res => {
            console.log('GOOGLE LOGIN - CREATE OR UPDATE USER RES ---', res);
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
            roleBasedRedirect(res);
          })
          .catch(err => console.log(err));
        //history.push("/");
      })
      .catch(err => {
        console.log(err.message);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className='register'>
      <div className='register__container'>
        {loading ? (
          <h1 className='register__title'>Loading</h1>
        ) : (
          <h1 className='register__title'>Login</h1>
        )}
        <div className='register__form'>
          <input
            className='register__input'
            type='email'
            placeholder='Email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='register__input'
            type='password'
            placeholder='password'
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Link to='/forgot/password' className='register__forgotPW'>
            Forgot password?
          </Link>
          <br />
          <button
            className='register__btn emailPW'
            type='submit'
            onClick={handleSubmit}
            // disabled={!email || password.length < 6}
          >
            Login with Email &amp; Password
          </button>

          <button
            className='register__btn google'
            type='submit'
            onClick={googleLogin}
          >
            Google Login
          </button>
          <div className='register__link'>
            <p>
              New customer?
              <Link to='/register'> Start here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
