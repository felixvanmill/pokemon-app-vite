import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import { fetchPokemonDetails } from '../services/fetchPokemons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowsAltV, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import '../styles/PokemonDetails.css';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import useArrowKeyNavigation from '../hooks/useArrowKeyNavigation';

const MAX_STAT_VALUE = 150;

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

    useBodyBackgroundColor('#D9D9D9');
    useArrowKeyNavigation(pokemonId, navigate);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const getStatColor = (statValue) => {
        const ratio = statValue / MAX_STAT_VALUE;
        if (ratio <= 0.3) {
            return 'red';
        } else if (ratio <= 0.5) {
            return '#fff51070';
        } else {
            return 'green';
        }
    };

    const renderStatBar = (stat) => {
        const heightPercentage = (stat.base_stat / MAX_STAT_VALUE) * 100;
        const barColor = getStatColor(stat.base_stat);
        return (
            <div className="stat-bar" key={stat.stat.name}>
                <span className="stat-name">{stat.stat.name === 'hp' ? 'HP' : stat.stat.name}</span>
                <div className="bar-container">
                    <div className="bar" style={{ height: `${heightPercentage}%`, backgroundColor: barColor }}>
                        {stat.base_stat}
                    </div>
                </div>
            </div>
        );
    };

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
                    <div className="Measurements">
                    <div className="measurement">
                        <FontAwesomeIcon icon={faArrowsAltV}/> <span>Height: {pokemonDetails.height / 10} m</span>
                    </div>
                    <div className="measurement">
                        <FontAwesomeIcon icon={faWeightHanging}/> <span>Weight: {pokemonDetails.weight / 10} kg</span>
                    </div>
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
                    <div className="statistics-section">
                        <h2>Statistics</h2>
                        <div className="statistics-bars">
                            {pokemonDetails.stats.map(renderStatBar)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;