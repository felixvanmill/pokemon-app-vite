//Hook is used to navigate on PokemonDetails. Left and Right arrow can be used to switch between Pokemon.
import { useEffect } from 'react';

const useArrowKeyNavigation = (pokemonId, navigate) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft' && parseInt(pokemonId) > 1) { // Action of pressing the left button
                navigate(`/pokemon/${parseInt(pokemonId) - 1}`); // will navigate one page back
            } else if (event.key === 'ArrowRight' && parseInt(pokemonId) < 151) { // Action of pressing the right button
                navigate(`/pokemon/${parseInt(pokemonId) + 1}`); // will navigate one page forward
            }
        };

        window.addEventListener('keydown', handleKeyDown); //Event listener waiting for a keydown event

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [pokemonId, navigate]);
};

export default useArrowKeyNavigation;
