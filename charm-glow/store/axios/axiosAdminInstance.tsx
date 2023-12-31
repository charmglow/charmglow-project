// axios.js
import axios from 'axios';
import { redirect } from 'next/navigation';

const axiosAdminInstance = axios.create({
    baseURL: `http://api.charmglowjewelry.com/api/admin`, // Your API base URL
});

// Add a request interceptor to inject the JWT token
axiosAdminInstance.interceptors.request.use(
    (config) => {
        // Check if the token is present in localStorage
        const token = localStorage.getItem('adminToken');

        if (token) {
            // If the token is present, add it to the request headers
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // If the token is not present, you can cancel the request
            // or take other action, such as redirecting to a login page
            // For this example, we'll cancel the request
            redirect('/admin')
            // return Promise.reject('Token not present');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosAdminInstance;
