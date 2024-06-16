import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Helper function to fetch data from a URL
const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
    }
};

// Function to fetch additional details for each Pokémon by name or ID
export const fetchPokemonDetails = async (identifier) => {
    const url = `${API_BASE_URL}/${identifier}`;
    const data = await fetchData(url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
    return {
        id: data.id,
        name: data.name,
        ...data,
        image: imageUrl  // Ensure the correct data structure with the high-quality image
    };
};

export const fetchPokemons = async (limit = 151) => {
    const data = await fetchData(`${API_BASE_URL}?limit=${limit}`);
    const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.name);
            return {
                name: pokemon.name,
                ...details  // Spread the additional details into the result
            };
        })
    );
    return pokemonsWithDetails;
};

export const fetchNotCaughtPokemons = async (caughtPokemons, limit = 151) => {
    const data = await fetchData(`${API_BASE_URL}?limit=${limit}`);
    const allPokemonNames = data.results.map(pokemon => pokemon.name);
    const caughtPokemonNames = caughtPokemons.map(pokemon => pokemon.name);
    const notCaught = allPokemonNames.filter(name => !caughtPokemonNames.includes(name));
    const notCaughtPokemons = await Promise.all(
        notCaught.map(async name => {
            const details = await fetchPokemonDetails(name);
            return { name, id: details.id, image: details.image };
        })
    );
    return notCaughtPokemons.sort((a, b) => a.id - b.id);
};
