//Gets userEmail and sets it in localstorage to display e-mail in the navbar.
import { useState, useEffect } from 'react';

const useUserEmail = () => {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
    }, []);

    const clearUserEmail = () => setUserEmail(null);

    return [userEmail, clearUserEmail];
};

export default useUserEmail;
