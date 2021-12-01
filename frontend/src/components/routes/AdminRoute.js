/** @format */

import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../connections/auth';

const AdminRoute = props => {
  const { children, ...rest } = props;
  const { user } = useSelector(state => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user?.token) {
      currentAdmin(user.token)
        .then(res => {
          console.log('Admin Res', res);
          setOk(true);
        })
        .catch(err => {
          console.log('Admin Err ', err);
          setOk(false);
        });
    }
  }, [user]);

  return (
    <>
      {ok ? <Route {...rest} render={() => children} /> : <LoadingToRedirect />}
    </>
  );
};

export default AdminRoute;
