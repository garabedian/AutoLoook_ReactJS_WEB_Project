import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';


export const ProtectedRouteNoUser = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    return user ? <Component {...rest} /> : <Navigate to="/AutoLoook_ReactJS_WEB_Project/login"/>;
};

export const ProtectedRouteLoggedUser = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    return !user ? <Component {...rest} /> : <Navigate to="/AutoLoook_ReactJS_WEB_Project/list-items"/>;
};

