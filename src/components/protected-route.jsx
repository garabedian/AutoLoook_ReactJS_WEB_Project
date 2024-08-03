import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/user-context.jsx';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return user ? <Component {...rest} /> : <Navigate to="/AutoLoook_ReactJS_WEB_Project/login" />;
};

export default ProtectedRoute;