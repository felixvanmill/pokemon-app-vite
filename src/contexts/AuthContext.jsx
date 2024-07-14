//Context to store token and provide possibilities to login, logout, and update password.
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setCurrentUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email, token) => {
        setCurrentUser({ email });
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ email }));
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const updateUser = (newInfo) => {
        setCurrentUser((prevUser) => {
            const updatedUser = { ...prevUser, ...newInfo };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, token, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
