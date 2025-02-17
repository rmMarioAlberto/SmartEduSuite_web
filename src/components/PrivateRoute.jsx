import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.tipo)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;