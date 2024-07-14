import React, { useState, useEffect } from 'react';
import '../styles/PagesStyles/ProfilePage.css';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

function ProfilePage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const { currentUser, updateUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (newPassword !== confirmNewPassword) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError("");
        }
    }, [newPassword, confirmNewPassword]);

    useEffect(() => {
        if (newPassword.length > 0 && newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long!");
        } else if (newPassword === confirmNewPassword) {
            setPasswordError("");
        }
    }, [newPassword, confirmNewPassword]);

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        setUpdateMessage("");

        if (!currentUser) {
            setPasswordError("User not authenticated.");
            navigate('/login');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long!");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError("Passwords do not match!");
            return;
        }

        const requestBody = {
            email: currentUser.email,
            password: newPassword,
        };

        try {
            console.log("Sending request to update password for:", currentUser.email); // Debugging
            console.log("Request body:", requestBody); // Debugging

            const response = await axiosInstance.put(`/users/${currentUser.email}`, requestBody);

            console.log("API Response:", response); // Debugging

            if (response.status === 200 || response.status === 204) {
                setUpdateMessage("Password updated successfully!");
                updateUser({ password: newPassword });
            } else {
                const errorData = response.data;
                console.error("Error data:", errorData); // Debugging
                setPasswordError(errorData.message || "Failed to update password.");
            }
        } catch (error) {
            console.error("Error during password update:", error); // Debugging
            setPasswordError("An error occurred during password update.");
        }
    };

    return (
        <div className="ProfilePage">
            <h2>Update Password</h2>
            <form onSubmit={handlePasswordChange}>
                <div className="PasswordFrame">
                    <input
                        type="password"
                        id="currentPassword"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="PasswordFrame">
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="PasswordFrame">
                    <input
                        type="password"
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                {updateMessage && <p className="update-message">{updateMessage}</p>}
                <button type="submit" disabled={newPassword !== confirmNewPassword || newPassword.length < 8}>Change Password</button>
            </form>
        </div>
    );
}

export default ProfilePage;
