import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/MyPokemonPage.css';

const ItemType = {
    POKEMON: 'pokemon',
};

const MyPokemonPage = () => {
    const [caughtPokemons, setCaughtPokemons] = useState(() => {
        const stored = localStorage.getItem('caughtPokemons');
        return stored ? JSON.parse(stored).sort((a, b) => a.name.localeCompare(b.name)) : [];
    });
    const [notCaughtPokemons, setNotCaughtPokemons] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [notes, setNotes] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResults, setSelectedResults] = useState({});

    useEffect(() => {
        localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
        fetchNotCaughtPokemons();
    }, [caughtPokemons]);

    const fetchNotCaughtPokemons = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const allPokemonNames = response.data.results.map(pokemon => pokemon.name);
        const caughtPokemonNames = caughtPokemons.map(pokemon => pokemon.name);
        const notCaught = allPokemonNames.filter(name => !caughtPokemonNames.includes(name));
        const notCaughtPokemons = await Promise.all(
            notCaught.map(async name => {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                return { name, image: response.data.sprites.front_default };
            })
        );
        setNotCaughtPokemons(notCaughtPokemons.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSearchResults([]);
            return;
        }
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        const filteredPokemons = response.data.results.filter(pokemon =>
            pokemon.name.includes(query.toLowerCase())
        );
        setSearchResults(filteredPokemons);
    };

    const handleAddPokemon = async (selectedPokemons) => {
        const newCaughtPokemons = [...caughtPokemons];
        for (const pokemon of selectedPokemons) {
            if (!newCaughtPokemons.find(p => p.name === pokemon.name)) {
                const response = await axios.get(pokemon.url);
                const newPokemon = { name: pokemon.name, image: response.data.sprites.front_default };
                newCaughtPokemons.push(newPokemon);
            }
        }
        setCaughtPokemons(newCaughtPokemons.sort((a, b) => a.name.localeCompare(b.name)));
        setSearchQuery("");  // Clear the search input
        setSearchResults([]);  // Clear the search results
        setSelectedResults({});  // Clear the selected results
    };

    const handleSelectPokemon = (pokemon) => {
        setSelectedPokemon(pokemon);
        const retrievedNotes = localStorage.getItem(`notes_${pokemon.name}`) || "";
        setNotes(retrievedNotes);
    };

    const handleSaveNote = (note) => {
        if (selectedPokemon) {
            localStorage.setItem(`notes_${selectedPokemon.name}`, note);
            setNotes(note);
        }
    };

    const handleReleasePokemon = (pokemonName) => {
        const updatedCaughtPokemons = caughtPokemons.filter(pokemon => pokemon.name !== pokemonName);
        setCaughtPokemons(updatedCaughtPokemons.sort((a, b) => a.name.localeCompare(b.name)));
        if (selectedPokemon && selectedPokemon.name === pokemonName) {
            setSelectedPokemon(null);
            setNotes("");
        }
        localStorage.removeItem(`notes_${pokemonName}`);
    };

    const handleCheckboxChange = (pokemon, checked) => {
        setSelectedResults(prevSelectedResults => ({
            ...prevSelectedResults,
            [pokemon.name]: checked
        }));
    };

    const handleAddSelectedPokemons = () => {
        const selectedPokemons = searchResults.filter(pokemon => selectedResults[pokemon.name]);
        handleAddPokemon(selectedPokemons);
    };

    const handleMoveToCaught = (pokemonName) => {
        const movedPokemon = notCaughtPokemons.find(pokemon => pokemon.name === pokemonName);
        setCaughtPokemons([...caughtPokemons, movedPokemon].sort((a, b) => a.name.localeCompare(b.name)));
        setNotCaughtPokemons(notCaughtPokemons.filter(pokemon => pokemon.name !== pokemonName).sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleMoveToNotCaught = (pokemonName) => {
        const movedPokemon = caughtPokemons.find(pokemon => pokemon.name === pokemonName);
        setNotCaughtPokemons([...notCaughtPokemons, movedPokemon].sort((a, b) => a.name.localeCompare(b.name)));
        setCaughtPokemons(caughtPokemons.filter(pokemon => pokemon.name !== pokemonName).sort((a, b) => a.name.localeCompare(b.name)));
    };

    const renderCaughtPokemon = (pokemon) => (
        <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onRelease={handleMoveToNotCaught}
            onCatch={null}
            onSelect={handleSelectPokemon}
        />
    );

    const renderNotCaughtPokemon = (pokemon) => (
        <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onCatch={handleMoveToCaught}
            onRelease={null}
            onSelect={handleSelectPokemon}
        />
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="general-container">
            <div className="main-container">
                <div className="search-container">
                    <h2>Search Pokémon</h2>
                    <input
                        type="text"
                        placeholder="Search for Pokémon..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map(pokemon => (
                                <div key={pokemon.name} className="search-result-item">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedResults[pokemon.name]}
                                        onChange={(e) => handleCheckboxChange(pokemon, e.target.checked)}
                                    />
                                    <span>{pokemon.name}</span>
                                </div>
                            ))}
                            <button onClick={handleAddSelectedPokemons}>Add Selected</button>
                        </div>
                    )}
                </div>
                <DropArea onDropPokemon={handleMoveToCaught}>
                    <div className="caught-pokemon-container">
                        <h2>Caught Pokémon</h2>
                        <div className="caught-pokemon-list">
                            {caughtPokemons.map(renderCaughtPokemon)}
                        </div>
                        {caughtPokemons.length > 0 && (
                            <button className="clear-all-button" onClick={() => setCaughtPokemons([])}>Clear All</button>
                        )}
                    </div>
                </DropArea>
                {selectedPokemon && (
                    <div className="notes-container">
                        <h3>Notes for {selectedPokemon.name}</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onBlur={() => handleSaveNote(notes)}
                            rows="4"
                            cols="50"
                        />
                    </div>
                )}
                <DropArea onDropPokemon={handleMoveToNotCaught}>
                    <div className="not-caught-pokemon-container">
                        <h2>Not Caught Pokémon</h2>
                        <div className="not-caught-pokemon-list">
                            {notCaughtPokemons.map(renderNotCaughtPokemon)}
                        </div>
                    </div>
                </DropArea>
            </div>
            </div>
        </DndProvider>
    );
};

const DropArea = ({ onDropPokemon, children }) => {
    const [, drop] = useDrop({
        accept: ItemType.POKEMON,
        drop: (item) => onDropPokemon(item.name),
    });

    return (
        <div ref={drop} style={{ width: '100%' }}>
            {children}
        </div>
    );
};

const PokemonItem = ({ pokemon, onRelease, onCatch, onSelect }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.POKEMON,
        item: { name: pokemon.name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="pokemon-item"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={() => onSelect(pokemon)}
        >
            <img src={pokemon.image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
            {onRelease && <button onClick={() => onRelease(pokemon.name)}>Release</button>}
            {onCatch && <button onClick={() => onCatch(pokemon.name)}>Catch</button>}
        </div>
    );
};

export default MyPokemonPage;
