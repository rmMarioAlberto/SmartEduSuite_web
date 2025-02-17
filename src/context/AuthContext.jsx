import React, { createContext, useState, useEffect } from 'react';
import { getUser, getToken, login, logout } from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const user = getUser();
            const token = getToken();
            setUser(user);
            setToken(token);
        };
        loadUser();
    }, []);

    const handleLogin = async (correo, contra) => {
        const user = await login(correo, contra);
        setUser(user);
        const token = getToken();
        setToken(token);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};