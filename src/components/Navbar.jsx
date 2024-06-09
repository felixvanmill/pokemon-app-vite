// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/NavBar.css';

const Navbar = () => {
    const { currentUser, isAuthenticated, logout } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false);
    const navigate = useNavigate();

    // Function to toggle sidebar visibility
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const handleMouseEnter = () => setAccountDropdown(true);
    const handleMouseLeave = () => setAccountDropdown(false);
    const handleLogout = () => {
        logout();
        navigate('/login');
        setSidebarOpen(false); // Close sidebar when logging out
    };
    const handleLogin = () => {
        navigate('/login');
        setSidebarOpen(false); // Close sidebar when logging in
    };

    // Effect to handle window resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 800 && isSidebarOpen) {
                setSidebarOpen(false); // Automatically close the sidebar on larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarOpen]); // Dependencies array ensures effect runs only when isSidebarOpen changes

    const accountLabel = isAuthenticated ? `Account (${currentUser?.email})` : "Login";

    return (
        <div className="Navbar">
            <div className="menu-button" onClick={toggleSidebar}>☰</div>
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
            <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <Link to="/" className="NavLink" onClick={toggleSidebar}>Home</Link>
                <Link to="/pokemon" className="NavLink" onClick={toggleSidebar}>Pokémon</Link>
                <Link to="/items" className="NavLink" onClick={toggleSidebar}>Items</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/account/profile" className="NavLink" onClick={toggleSidebar}>Profile</Link>
                        <Link to="/account/mypokemon" className="NavLink" onClick={toggleSidebar}>My Pokémon</Link>
                        <span className="NavLink" onClick={() => { handleLogout(); toggleSidebar(); }}>Log Off</span>
                    </>
                ) : (
                    <span className="NavLink" onClick={() => { handleLogin(); toggleSidebar(); }}>Login</span>
                )}
            </div>
        </div>
    );
};

export default Navbar;
