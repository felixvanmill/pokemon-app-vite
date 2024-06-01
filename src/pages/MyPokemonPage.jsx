import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/MyPokemonPage.css';
import { fetchPokemonDetails, fetchNotCaughtPokemons } from '../services/api';
import DropArea from '../components/DropArea';
import PokemonItem from '../components/PokemonItem.jsx';

const MyPokemonPage = () => {
    const [caughtPokemons, setCaughtPokemons] = useState(() => {
        const stored = localStorage.getItem('caughtPokemons');
        return stored ? JSON.parse(stored).sort((a, b) => a.id - b.id) : [];
    });
    const [notCaughtPokemons, setNotCaughtPokemons] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [notes, setNotes] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResults, setSelectedResults] = useState({});
    const [notesIndicator, setNotesIndicator] = useState({});

    const mainContainerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
        fetchNotCaughtPokemons(caughtPokemons).then(setNotCaughtPokemons);
        updateNotesIndicator();
    }, [caughtPokemons]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mainContainerRef.current &&
                !mainContainerRef.current.contains(event.target) &&
                !event.target.closest('.notes-container')
            ) {
                setSelectedPokemon(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const updateNotesIndicator = () => {
        const newNotesIndicator = {};
        caughtPokemons.forEach(pokemon => {
            const note = localStorage.getItem(`notes_${pokemon.name}`);
            if (note) {
                newNotesIndicator[pokemon.name] = true;
            }
        });
        notCaughtPokemons.forEach(pokemon => {
            const note = localStorage.getItem(`notes_${pokemon.name}`);
            if (note) {
                newNotesIndicator[pokemon.name] = true;
            }
        });
        setNotesIndicator(newNotesIndicator);
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSearchResults([]);
            return;
        }
        const response = await axios.get(`${API_BASE_URL}?limit=151`);
        const filteredPokemons = response.data.results.filter(pokemon =>
            pokemon.name.includes(query.toLowerCase())
        );
        const detailedPokemons = await Promise.all(
            filteredPokemons.map(async (pokemon) => {
                const details = await fetchPokemonDetails(pokemon.name);
                return { name: pokemon.name, id: details.id, image: details.image };
            })
        );
        setSearchResults(detailedPokemons);
    };

    const handleAddPokemon = (selectedPokemons) => {
        const newCaughtPokemons = [...caughtPokemons];
        selectedPokemons.forEach(pokemon => {
            if (!newCaughtPokemons.find(p => p.name === pokemon.name)) {
                newCaughtPokemons.push(pokemon);
            }
        });
        setCaughtPokemons(newCaughtPokemons.sort((a, b) => a.id - b.id));
        setSearchQuery("");  // Clear the search input
        setSearchResults([]);  // Clear the search results
        setSelectedResults({});  // Clear the selected results
        updateNotesIndicator();
    };

    const handleSelectPokemon = (pokemon, event) => {
        event.stopPropagation(); // Prevent the click from propagating to the main container
        setSelectedPokemon(pokemon);
        const retrievedNotes = localStorage.getItem(`notes_${pokemon.name}`) || "";
        setNotes(retrievedNotes);
    };

    const handleSaveNote = (note) => {
        if (selectedPokemon) {
            localStorage.setItem(`notes_${selectedPokemon.name}`, note);
            setNotes(note);
            updateNotesIndicator();
        }
    };

    const handleReleasePokemon = (pokemonName) => {
        const updatedCaughtPokemons = caughtPokemons.filter(pokemon => pokemon.name !== pokemonName);
        setCaughtPokemons(updatedCaughtPokemons.sort((a, b) => a.id - b.id));
        if (selectedPokemon && selectedPokemon.name === pokemonName) {
            setSelectedPokemon(null);
            setNotes("");
        }
        localStorage.removeItem(`notes_${pokemonName}`);
        updateNotesIndicator();
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
        setCaughtPokemons([...caughtPokemons, movedPokemon].sort((a, b) => a.id - b.id));
        setNotCaughtPokemons(notCaughtPokemons.filter(pokemon => pokemon.name !== pokemonName).sort((a, b) => a.id - b.id));
        updateNotesIndicator();
    };

    const handleMoveToNotCaught = (pokemonName) => {
        const movedPokemon = caughtPokemons.find(pokemon => pokemon.name === pokemonName);
        setNotCaughtPokemons([...notCaughtPokemons, movedPokemon].sort((a, b) => a.id - b.id));
        setCaughtPokemons(caughtPokemons.filter(pokemon => pokemon.name !== pokemonName).sort((a, b) => a.id - b.id));
        updateNotesIndicator();
    };

    const handleViewDetails = (pokemonId) => {
        window.open(`http://localhost:5173/pokemon/${pokemonId}`, '_blank');
    };

    const renderCaughtPokemon = (pokemon) => (
        <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onRelease={handleMoveToNotCaught}
            onCatch={null}
            onSelect={handleSelectPokemon}
            onViewDetails={handleViewDetails}
            isSelected={selectedPokemon && selectedPokemon.name === pokemon.name}
            hasNote={notesIndicator[pokemon.name]}
        />
    );

    const renderNotCaughtPokemon = (pokemon) => (
        <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onCatch={handleMoveToCaught}
            onRelease={null}
            onSelect={handleSelectPokemon}
            onViewDetails={handleViewDetails}
            isSelected={selectedPokemon && selectedPokemon.name === pokemon.name}
            hasNote={notesIndicator[pokemon.name]}
        />
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="general-container">
                <div className="main-container" ref={mainContainerRef} onClick={() => setSelectedPokemon(null)}>
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
                                        <span>#{pokemon.id} {pokemon.name}</span>
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
                        <div className="notes-container" onClick={(e) => e.stopPropagation()}>
                            <fieldset className="notes-fieldset">
                                <legend>Notes for {selectedPokemon.name}</legend>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    onBlur={() => handleSaveNote(notes)}
                                    rows="4"
                                    cols="50"
                                />
                            </fieldset>
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

export default MyPokemonPage;
