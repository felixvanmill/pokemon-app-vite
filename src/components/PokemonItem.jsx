// This component is to create movable Pokemon containers for the MyPokemonPage.
import React from 'react';
import { useDrag } from 'react-dnd'; //This package is used to create movable components which can be dragged around
import { FaInfoCircle } from 'react-icons/fa';
import { ItemType } from '../services/constants';

const PokemonItem = ({ pokemon, onRelease, onCatch, onSelect, onViewDetails, isSelected, hasNote }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.POKEMON, // Item type for drag-and-drop
        item: { name: pokemon.name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // Monitor drag state
        }),
    }));

    return (
        <div
            ref={drag}
            className={`pokemon-item ${isSelected ? 'selected' : ''}`} // Conditional class for selected state
            style={{ opacity: isDragging ? 0.5 : 1 }} // Style change when dragging
            onClick={(e) => onSelect(pokemon, e)} // Handle item selection
        >
            <img src={pokemon.image} alt={pokemon.name} />
            <span>#{pokemon.id} {pokemon.name} {hasNote && <span className="note-indicator">*</span>}</span>
            {onRelease && (
                <button onClick={(e) => { e.stopPropagation(); onRelease(pokemon.name); }}>Release</button> //Button to release Pokemon again
            )}
            {onCatch && (
                <button onClick={(e) => { e.stopPropagation(); onCatch(pokemon.name); }}>Catch</button> // Button to catch Pokemon
            )}
            <FaInfoCircle
                className="info-icon"
                onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(pokemon.id);
                }}
            />
        </div>
    );
};

export default PokemonItem;
