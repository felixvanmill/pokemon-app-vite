import { useEffect } from 'react';

const useArrowKeyNavigation = (pokemonId, navigate) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft' && parseInt(pokemonId) > 1) {
                navigate(`/pokemon/${parseInt(pokemonId) - 1}`);
            } else if (event.key === 'ArrowRight' && parseInt(pokemonId) < 151) {
                navigate(`/pokemon/${parseInt(pokemonId) + 1}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [pokemonId, navigate]);
};

export default useArrowKeyNavigation;
