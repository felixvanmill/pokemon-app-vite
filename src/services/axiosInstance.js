// src/services/axiosInstance.js
import axios from 'axios';

// Log the environment variables to verify they are being read correctly
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
console.log("API Key:", import.meta.env.VITE_API_KEY);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_API_KEY,
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
