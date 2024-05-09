import { useState, useEffect } from 'react';
import { fetchPokemons } from '../services/fetchPokemons';

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
                setPokemons([]);  // It's a good practice to clear any old state in case of error.
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { pokemons, loading, error };
};

export default usePokemonData;
