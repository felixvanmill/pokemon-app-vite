// hooks/useBodyBackgroundColor.js
import { useEffect } from 'react';

const useBodyBackgroundColor = (color) => {
    useEffect(() => {
        document.body.style.backgroundColor = color;

        return () => {
            document.body.style.backgroundColor = 'initial'; // Reset to default when unmounting or changing
        };
    }, [color]);
};

export default useBodyBackgroundColor;
