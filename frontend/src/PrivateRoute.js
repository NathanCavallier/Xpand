import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={(props) =>
        user && roles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;