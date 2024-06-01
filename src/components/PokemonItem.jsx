import React from 'react';
import { useDrag } from 'react-dnd';
import { FaInfoCircle } from 'react-icons/fa';
import { ItemType } from '../services/constants';

const PokemonItem = ({ pokemon, onRelease, onCatch, onSelect, onViewDetails, isSelected, hasNote }) => {
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
            className={`pokemon-item ${isSelected ? 'selected' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={(e) => onSelect(pokemon, e)}
        >
            <img src={pokemon.image} alt={pokemon.name} />
            <span>#{pokemon.id} {pokemon.name} {hasNote && <span className="note-indicator">*</span>}</span>
            {onRelease && <button onClick={(e) => { e.stopPropagation(); onRelease(pokemon.name); }}>Release</button>}
            {onCatch && <button onClick={(e) => { e.stopPropagation(); onCatch(pokemon.name); }}>Catch</button>}
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
