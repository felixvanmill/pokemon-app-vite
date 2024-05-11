// src/components/PokemonList.jsx
import React from 'react';

const PokemonList = ({ title, pokemons, onSelectPokemon, onMovePokemon, isCaught }) => {
    return (
        <div>
            <h3>{title}</h3>
            <ul>
                {pokemons.length ? (
                    pokemons.map((pokemonName) => (
                        <li key={pokemonName} onClick={() => {
                            onSelectPokemon(pokemonName);
                            onMovePokemon(pokemonName, isCaught);
                        }}>
                            {pokemonName}
                        </li>
                    ))
                ) : (
                    <p>No Pokémon here!</p>
                )}
            </ul>
        </div>
    );
};

export default PokemonList;

