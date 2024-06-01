const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Helper function to fetch data from a URL and parse JSON
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

// Function to fetch additional details for each Pokémon by name
export const fetchPokemonDetails = async (pokemonName) => {
    const url = `${API_BASE_URL}/${pokemonName}`;
    const data = await fetchData(url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
    return {
        id: data.id,
        ...data,
        image: imageUrl  // Ensure the correct data structure with the high-quality image
    };
};

export const fetchNotCaughtPokemons = async (caughtPokemons) => {
    const data = await fetchData(`${API_BASE_URL}?limit=151`);
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
