// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userEmail, setUserEmail] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (email) => {
        setUserEmail(email);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUserEmail(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ userEmail, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
