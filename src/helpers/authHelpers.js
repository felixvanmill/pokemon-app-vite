// Helper is used to handle authentication errors coming from logging in.
import axiosInstance from '../services/axiosInstance';

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const registerUser = async (email, password, setRegisterMessage, setRegisterError) => {
    const requestBody = {
        username: email,
        email: email,
        password: password,
        info: "",
        authorities: [{ authority: "USER" }],
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
