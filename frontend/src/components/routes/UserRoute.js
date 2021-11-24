/** @format */

import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";

const UserRoute = (props) => {
  const { children, ...rest } = props;
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      user?.token ? (<Route {...rest} render={() => children} />) : (
      <LoadingToRedirect />)
    </>
  );
};

export default UserRoute;
