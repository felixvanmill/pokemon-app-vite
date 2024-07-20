//Returns Pokemondata used for ../pages/PokemonPage.
import { useState, useEffect } from 'react';
import { fetchPokemons } from '../services/fetchPokemons'; //Imports function to get Pokemondata from API.

const usePokemonData = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchPokemons();
                setPokemons(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch pokemons');
                setPokemons([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { pokemons, loading, error };
};

export default usePokemonData;
