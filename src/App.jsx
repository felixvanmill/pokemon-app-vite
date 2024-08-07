// src/App.js
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import PokemonDetails from './pages/PokemonDetails.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import MyPokemonPage from './pages/MyPokemonPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { logoutUser } from './helpers/autoLogOffTimer.js';

function App() {
    useEffect(() => {
        const inactivityTime = () => {
            let timeout;
            const resetTimer = () => {
                clearTimeout(timeout);
                timeout = setTimeout(logoutUser, 10 * 60 * 1000); // automatically logs user off after 10 minutes
            };

            window.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onkeydown = resetTimer;
            window.onscroll = resetTimer;
        };

        inactivityTime();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/pokemon" element={<PokemonPage />} />
                    <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
                    <Route path="/items" element={<ItemsPage />} />
                    <Route path="/account/mypokemon" element={<MyPokemonPage />} />  // Add the route for MyPokemonPage
                    <Route path="/account/profile" element={<ProfilePage />} />  // Add the route for ProfilePage
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
