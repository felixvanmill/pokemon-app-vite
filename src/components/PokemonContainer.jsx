// src/components/PokemonContainer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComponentStyles/PokemonContainer.css'; // Ensure you have the relevant CSS

const PokemonContainer = ({ pokemons }) => {
    return (
        <div className="pokemon-container">
            {pokemons.map(pokemon => (
                <div className="pokemon-card" key={pokemon.id}>
                    <h3>{pokemon.name} (#{pokemon.id})</h3>
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.image} alt={pokemon.name} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PokemonContainer;
