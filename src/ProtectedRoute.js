import React from "react";
import { Route } from "react-router-dom";
import Auth from "./pages/Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <h1>You are not authorized to access this page!</h1>;
        }
      }}
    />
  );
};

export default ProtectedRoute;
