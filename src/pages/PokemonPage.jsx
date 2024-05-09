import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePokemonData from '../hooks/usePokemonData';
import '../App.css';  // Ensure this import is correct
import '../styles/PokemonPage.css'

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
            <div className="pokemon-container">
                {filteredPokemons.map(pokemon => (
                    <div className="pokemon-card" key={pokemon.id}>
                        <h3>{pokemon.name} (#{pokemon.id})</h3>
                        <Link to={`/pokemon/${pokemon.id}`}>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonPage;
