//Notesection for MyPokemonpage. Saves written notes in localstorage since the API has limited possibilities.
import React, { useEffect, useState } from 'react';

const NoteSection = ({ pokemonName, notes, onSaveNote }) => {
    const [editNotes, setEditNotes] = useState(notes);

    useEffect(() => {
        setEditNotes(notes); // Update local state when notes prop changes
    }, [notes]);

    const handleSaveClick = () => {
        onSaveNote(editNotes); // Save the edited notes
    };

    return (
        <div>
            {pokemonName ? (
                <>
                    <h3>Notes for {pokemonName}</h3>
                    <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                    <button onClick={handleSaveClick}>Save Notes</button>
                </>
            ) : (
                <p>Select a Pokemon to view notes.</p>
            )}
        </div>
    );
};

export default NoteSection;
