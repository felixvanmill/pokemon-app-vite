// src/pages/PokemonPage.js
import React, { useState } from 'react';
import usePokemonData from '../hooks/usePokemonData';
import PokemonContainer from '../components/PokemonContainer';
import '../App.css';
import '../styles/PagesStyles/PokemonPage.css';

function PokemonPage() {
    const { pokemons, loading, error } = usePokemonData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '300px' }}
                />
            </div>
            <PokemonContainer pokemons={filteredPokemons} />
        </div>
    );
}

export default PokemonPage;
