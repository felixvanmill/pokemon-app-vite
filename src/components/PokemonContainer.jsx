//This component is used inside PokemonPage, its used to create containers.
// The component makes  containers with a Pokemon-img, an ID is added + the Pokemon name.
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ComponentStyles/PokemonContainer.css'; // Import CSS for styling

const PokemonContainer = ({ pokemons }) => {
    return (
        <div className="pokemon-container">
            {pokemons.map(pokemon => (
                <div className="pokemon-card" key={pokemon.id}> {/* Key is required for list rendering */}
                    <h3>{pokemon.name} (#{pokemon.id})</h3> {/* Display Pokémon name and ID */}
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.image} alt={pokemon.name} /> {/* Pokémon image */}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PokemonContainer;
