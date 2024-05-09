import React from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import PokemonPage from './pages/PokemonPage.jsx';
import PokemonDetails from './pages/PokemonDetails.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ItemsPage from "./pages/ItemsPage.jsx";

function App() {
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

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;