import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import { fetchPokemonDetails } from '../services/fetchPokemons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsAltV, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import '../styles/PokemonDetails.css';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import useArrowKeyNavigation from '../hooks/useArrowKeyNavigation';

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#FFC0CB",
};

function PokemonDetails() {
    const { pokemonId } = useParams();
    const navigate = useNavigate();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPokemonDetails() {
            try {
                const details = await fetchPokemonDetails(pokemonId);
                setPokemonDetails(details);
            } catch (err) {
                setError(`Failed to fetch Pokémon details: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadPokemonDetails();
    }, [pokemonId]);

    const backgroundColor = pokemonDetails ? typeColors[pokemonDetails.types[0].type.name] : 'transparent';
    useBodyBackgroundColor(backgroundColor);
    useArrowKeyNavigation(pokemonId, navigate);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="pokemon-details-container">
            {pokemonDetails && (
                <div className="pokemon-info">
                    <BackButton/>
                    <div className="pokemon-image-container">
                        {pokemonId > 1 && (
                            <button onClick={() => navigate(`/pokemon/${parseInt(pokemonId, 10) - 1}`)}
                                    className="nav-button prev-button">
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </button>
                        )}
                        <img src={pokemonDetails.image} alt={pokemonDetails.name} className="pokemon-image"/>
                        {pokemonId < 151 && (
                            <button onClick={() => navigate(`/pokemon/${parseInt(pokemonId, 10) + 1}`)}
                                    className="nav-button next-button">
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </button>
                        )}
                    </div>
                    <h1>{pokemonDetails.name} (#{pokemonDetails.id})</h1>
                    <div className="measurement">
                        <FontAwesomeIcon icon={faArrowsAltV}/> <span>Height: {pokemonDetails.height / 10} m</span>
                    </div>
                    <div className="measurement">
                        <FontAwesomeIcon icon={faWeightHanging}/> <span>Weight: {pokemonDetails.weight / 10} kg</span>
                    </div>
                    <div className="details-flex-container">
                        <div className="details-section">
                            <h2>Types</h2>
                            <ul>
                                {pokemonDetails.types.map((type, index) => (
                                    <li key={index}>{type.type.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="details-section">
                            <h2>Abilities</h2>
                            <ul>
                                {pokemonDetails.abilities.map((ability, index) => (
                                    <li key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <h2>Statistics</h2>
                    <ul>
                        {pokemonDetails.stats.map((stat, index) => (
                            <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;
