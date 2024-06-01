import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../services/constants';

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

export default DropArea;
