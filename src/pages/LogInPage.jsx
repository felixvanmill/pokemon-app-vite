import React, { useState } from 'react';
import '../styles/PagesStyles/LoginPage.css';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail, registerUser, loginUser } from '../helpers/authHelpers';

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
            setPasswordError("Password must be at least 8 characters long!"); // Error to prevent users entering a short password
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!"); // Forces user to confirm the password once when registering
            setIsLoading(false);
            return;
        }

        await registerUser(email, password, setRegisterMessage, setRegisterError);
        setIsLoading(false);
    };

    const handleLogin = async () => {
        await loginUser(email, password, login, navigate, setLoginMessage, setLoginError);
        setIsLoading(false);
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
        resetForm(); //Toggles form from login to register
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
