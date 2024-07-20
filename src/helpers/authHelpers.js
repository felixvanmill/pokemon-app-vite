// Helpers are used to handle authentication and errors coming from logging in and registering
// isTokenExpired to check experation date of the Token.
import axiosInstance from '../services/axiosInstance';

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

//used to register users
export const registerUser = async (email, password, setRegisterMessage, setRegisterError) => {
    const requestBody = {
        username: email, //Currently no possibility to set a username so we'll just set it equal to e-mail.
        email: email,
        password: password,
        info: "",
        authorities: [{ authority: "USER" }], //can be used in future to give admin authorities.
    };

    try {
        const response = await axiosInstance.post('/users', requestBody);

        if (response.status === 200) {
            setRegisterMessage("Registration successful! Please log in with your new account.");
        } else if (response.status === 409) {
            setRegisterError("User already exists.");
        } else {
            setRegisterError(`Registration failed: ${response.data.message || 'Unknown error'}.`);
        }
    } catch (error) {
        console.error("Registration error:", error); // Debugging
        setRegisterError("An error occurred during registration.");
    }
};

export const loginUser = async (email, password, login, navigate, setLoginMessage, setLoginError) => {
    try {
        const response = await axiosInstance.post('/users/authenticate', {
            username: email,
            password: password,
        });

        if (response.status === 200) {
            const data = response.data;
            setLoginMessage("Login successful! Redirecting to homepage...");
            login(email, data.jwt); // Ensure token is stored

            // Delay redirection to show success message
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2 seconds delay
        } else if (response.status === 401) {
            setLoginError("Invalid email or password.");
        } else if (response.status === 404) {
            setLoginError("User not found. Please register first.");
        } else {
            setLoginError(`Login failed: ${response.data.message || 'Unknown error'}.`);
        }
    } catch (error) {
        console.error("Login error:", error); // Debugging
        setLoginError("An error occurred during login.");
    }
};

//Checks for expiration date of the Token.
export const isTokenExpired = (token) => {
    if (!token) return true;

    const tokenParts = token.split('.');
    if (tokenParts.length < 3) return true;

    try {
        const payload = JSON.parse(atob(tokenParts[1]));
        const exp = payload.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime >= exp;
    } catch (e) {
        return true;
    }
};