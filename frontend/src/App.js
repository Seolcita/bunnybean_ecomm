/** @format */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { auth } from './firebase';
import { useDispatch } from 'react-redux'; //react hook

// Pages
import Navbar from './pages/nav/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

// CSS
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('USER >>>>>>>', user);
      // If there is user, update the info into redux store/state
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    // Cleanup - to prevent memory leak
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
