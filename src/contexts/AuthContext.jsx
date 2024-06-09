// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = (email, token) => {
        setCurrentUser({ email });
        setToken(token);
        setIsAuthenticated(true);
        // Remove or comment out the console log in production
        // console.log("JWT Token set:", token); // Debugging token set
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    const updateUser = (newInfo) => {
        setCurrentUser((prevUser) => ({ ...prevUser, ...newInfo }));
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
