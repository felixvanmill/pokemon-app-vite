import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ className = "back-button", ariaLabel = "Go back" }) => {
    const navigate = useNavigate();

    // Function to navigate to the Pokémon list page
    const handleBack = () => {
        navigate('/pokemon');  // Navigate to Pokémon list page
    };

    return (
        <button onClick={handleBack} className={className} aria-label={ariaLabel}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
};

export default BackButton;
