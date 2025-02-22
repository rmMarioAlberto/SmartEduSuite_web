import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, token } = useContext(AuthContext);

    if (token && user) {
        switch (user.tipo) {
            case 2:
                return <Navigate to="/maestro/dashboard" />;
            case 3:
                return <Navigate to="/admin/dashboard" />;
            default:
                return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};

export default PublicRoute;