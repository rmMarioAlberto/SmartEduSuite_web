import React, { createContext, useState, useEffect } from 'react';
import { getUser, getToken, logout as authLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = getUser();
        const storedToken = getToken();
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    const handleLoginSuccess = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUser(user);
        setToken(token);
    };

    const handleLogout = () => {
        authLogout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser: handleLoginSuccess, setToken, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
