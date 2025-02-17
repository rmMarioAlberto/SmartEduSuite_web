import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, token } = useContext(AuthContext);

    if (token && user) {
        switch (user.tipo) {
            case 2:
                return <Navigate to="/vista-maestro" />;
            case 3:
                return <Navigate to="/vista-admin" />;
            default:
                return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};

export default PublicRoute;