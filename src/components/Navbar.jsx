// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/NavBar.css';

const Navbar = () => {
    const { userEmail, isAuthenticated, logout } = useAuth();
    const [accountDropdown, setAccountDropdown] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => setAccountDropdown(true);
    const handleMouseLeave = () => setAccountDropdown(false);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const handleLogin = () => {
        navigate('/login');
    };

    const accountLabel = isAuthenticated ? `Account (${userEmail})` : "Login";

    return (
        <div className="Navbar">
            <div className="Navigation">
                <div className="Frame2">
                    <div className="Home"><Link to="/" className="NavLink">Home</Link></div>
                    <div className="Line1"></div>
                    <div className="PokMon"><Link to="/pokemon" className="NavLink">Pokémon</Link></div>
                    <div className="Line2"></div>
                    <div className="Items"><Link to="/items" className="NavLink">Items</Link></div>
                    <div className="Line3"></div>

                    <div
                        className="Account"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="NavLink" onClick={isAuthenticated ? null : handleLogin}>{accountLabel}</span>
                        {accountDropdown && isAuthenticated && (
                            <div className="Dropdown">
                                <Link to="/account/profile" className="DropdownItem">Profile</Link>
                                <Link to="/account/mypokemon" className="DropdownItem">My Pokémon</Link>
                                <span className="DropdownItem" onClick={handleLogout}>Log Off</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
