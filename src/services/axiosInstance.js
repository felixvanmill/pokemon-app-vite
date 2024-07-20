// src/services/axiosInstance.js
import axios from 'axios';
import { isTokenExpired } from '../helpers/authHelpers'; //Used to check the timeout of the Token.

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
        if (isTokenExpired(token)) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;
