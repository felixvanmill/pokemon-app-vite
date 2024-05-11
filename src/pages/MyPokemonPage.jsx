// src/pages/MyPokemonPage.jsx
import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import NoteSection from '../components/NoteSection';
import '../styles/MyPokemonPage.css';

const MyPokemonPage = () => {
    const [caughtPokemons, setCaughtPokemons] = useState(() => {
        const stored = localStorage.getItem('caughtPokemons');
        return stored ? JSON.parse(stored).sort() : [];
    });
    const [notCaughtPokemons, setNotCaughtPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await response.json();
            const allPokemonNames = data.results.map(pokemon => pokemon.name).sort();

            const storedCaughtPokemons = caughtPokemons.length > 0 ? caughtPokemons : (JSON.parse(localStorage.getItem('caughtPokemons')) || []).sort();
            const filteredNotCaughtPokemons = allPokemonNames.filter(name => !storedCaughtPokemons.includes(name));

            console.log('Stored Caught:', storedCaughtPokemons); // Debug: Log stored caught Pokémon
            console.log('Filtered Not Caught:', filteredNotCaughtPokemons); // Debug: Log filtered not caught Pokémon

            setCaughtPokemons(storedCaughtPokemons);
            setNotCaughtPokemons(filteredNotCaughtPokemons);
        };

        fetchPokemon();
    }, []); // No dependencies to avoid re-fetching unintentionally

    useEffect(() => {
        localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
    }, [caughtPokemons]); // Update local storage whenever caughtPokemons changes

    const handleSelectPokemon = (pokemonName) => {
        setSelectedPokemon(pokemonName);
        const retrievedNotes = localStorage.getItem(`notes_${pokemonName}`) || "";
        setNotes(retrievedNotes); // Ensure notes are updated correctly from local storage
    };

    const handleSaveNote = (note) => {
        localStorage.setItem(`notes_${selectedPokemon}`, note);
        setNotes(note);
    };

    const handleMovePokemon = (pokemonName, isCaught) => {
        if (isCaught) {
            const newCaught = caughtPokemons.filter(name => name !== pokemonName).sort();
            const newNotCaught = [...notCaughtPokemons, pokemonName].sort();
            setCaughtPokemons(newCaught);
            setNotCaughtPokemons(newNotCaught);
            localStorage.setItem('caughtPokemons', JSON.stringify(newCaught));
        } else {
            const newCaught = [...caughtPokemons, pokemonName].sort();
            const newNotCaught = notCaughtPokemons.filter(name => name !== pokemonName).sort();
            setCaughtPokemons(newCaught);
            setNotCaughtPokemons(newNotCaught);
            localStorage.setItem('caughtPokemons', JSON.stringify(newCaught));
        }
    };

    return (
        <div className="main-container">
            <div className="caught-non-caught-container">
                <div className="pokemon-list-caught">
                    <PokemonList
                        title="Pokemons Caught"
                        pokemons={caughtPokemons}
                        onSelectPokemon={handleSelectPokemon}
                        onMovePokemon={handleMovePokemon}
                        isCaught={true}
                    />
                </div>
                <div className="pokemon-list-not-caught">
                    <PokemonList
                        title="Pokemons Not Caught"
                        pokemons={notCaughtPokemons}
                        onSelectPokemon={handleSelectPokemon}
                        onMovePokemon={handleMovePokemon}
                        isCaught={false}
                    />
                </div>
                <div className="notes-section">
                    <NoteSection
                        pokemonName={selectedPokemon}
                        notes={notes}
                        onSaveNote={handleSaveNote}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyPokemonPage;
