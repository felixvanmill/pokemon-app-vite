import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ className = "back-button", ariaLabel = "Go back" }) => {
    const navigate = useNavigate();

    // Functie om naar de vorige pagina te gaan
    const handleBack = () => {
        navigate(-1);  // Navigatie voor een pagina terug
    };

    return (
        <button onClick={handleBack} className={className} aria-label={ariaLabel}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
};

export default BackButton;
