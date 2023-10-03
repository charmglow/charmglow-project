// axios.js
import axios from 'axios';
import { persistor } from '../store'; // Import the Redux Persist persistor
import { useAppSelector } from '../hooks';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api', // Your API base URL
});

// Add a request interceptor to inject the JWT token
axiosInstance.interceptors.request.use(
    async (config) => {
        const { user } = useAppSelector(state => state.auth)

        if (user) {
            config.headers.Authorization = `Bearer ${user.token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
