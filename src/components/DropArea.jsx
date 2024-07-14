//Component to create a drop-area to drag and drop caught+noncaught Pokemons (used for MyPokemonpage).
import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../services/constants';

const DropArea = ({ onDropPokemon, children }) => {
    const [, drop] = useDrop({
        accept: ItemType.POKEMON, // Accepting items of type POKEMON
        drop: (item) => onDropPokemon(item.name), // Handling drop event
    });

    return (
        <div ref={drop} style={{ width: '100%' }}> {/* Assigning drop ref to div */}
            {children}
        </div>
    );
};

export default DropArea;
