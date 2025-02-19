import React, { createContext, useState, useEffect } from 'react';
import { getUser, getToken, logout } from '../services/authService';

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

    const handleLogout = () => {
        logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};