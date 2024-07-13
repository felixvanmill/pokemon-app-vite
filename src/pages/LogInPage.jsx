import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import '../styles/PagesStyles/LoginPage.css';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function LogInPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setLoginMessage("");
        setLoginError("");
        setRegisterMessage("");
        setRegisterError("");

        if (!validateEmail(email)) {
            if (isRegistering) {
                setRegisterError("Invalid email format.");
            } else {
                setLoginError("Invalid email format.");
            }
            setIsLoading(false);
            return;
        }

        if (isRegistering) {
            handleRegistration();
        } else {
            handleLogin();
        }
    };

    const handleRegistration = async () => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long!");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            setIsLoading(false);
            return;
        }

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
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
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
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(password !== e.target.value ? "Passwords do not match!" : "");
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        resetForm();
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setLoginMessage("");
        setLoginError("");
        setRegisterMessage("");
        setRegisterError("");
    };

    return (
        <div className="Loginboxframe">
            <div className="Loginframe">
                <div style={{ width: "200%", position: "relative" }}>
                    <form onSubmit={handleSubmit} className={`Frame3 ${isRegistering ? 'hiddenForm' : 'visibleForm'}`}>
                        <div className="Emailframe">
                            <input type="email" id="email-login" name="email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                        </div>
                        <div className="Passwordframe">
                            <input type="password" id="password-login" name="password" value={password}
                                   onChange={handlePasswordChange} placeholder="Enter your password" required />
                        </div>
                        <div className="LogInErrorContainer">
                            {loginError && <p className="server-message error">{loginError}</p>}
                            {loginMessage && <p className="server-message">{loginMessage}</p>}
                        </div>
                        <div className="LoginButton">
                            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                        </div>
                        <div className="RegisterToggle">
                            <button type="button" onClick={toggleForm}>
                                New here? Register!
                            </button>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className={`Frame3 ${isRegistering ? 'visibleForm' : 'hiddenForm'}`}>
                        <div className="Emailframe">
                            <input type="email" id="email-register" name="email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                        </div>
                        <div className="Passwordframe">
                            <input type="password" id="password-register" name="password" value={password}
                                   onChange={handlePasswordChange} placeholder="Enter your password" required />
                        </div>
                        <div className="Passwordframe">
                            <input type="password" id="confirmPassword-register" name="confirmPassword" value={confirmPassword}
                                   onChange={handleConfirmPasswordChange} placeholder="Confirm your password" required />
                        </div>
                        <div className="RegisterErrorContainer">
                            {passwordError && <p className="password-error">{passwordError}</p>}
                            {registerError && <p className="server-message error">{registerError}</p>}
                            {registerMessage && <p className="server-message">{registerMessage}</p>}
                        </div>
                        <div className="LoginButton">
                            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                        </div>
                        <div className="RegisterToggle">
                            <button type="button" onClick={toggleForm}>
                                Go to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="PokemonLogoBox">
                <img className="PokemonLogo" src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokemon Logo" />
            </div>
        </div>
    );
}

export default LogInPage;
