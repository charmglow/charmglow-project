// axios.js
import axios from 'axios';
import { redirect } from 'next/navigation';

const axiosUserInstance = axios.create({
    baseURL: "http://api.charmglowjewelry.com/api", // Your API base URL
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});



// Add a request interceptor to inject the JWT token
axiosUserInstance.interceptors.request.use(
    (config) => {
        // Check if the token is present in localStorage
        const token = localStorage.getItem('userToken');

        if (token) {
            // If the token is present, add it to the request headers
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // If the token is not present, you can cancel the request
            // or take other action, such as redirecting to a login page
            // For this example, we'll cancel the request
            redirect('/login')
            // return Promise.reject('Token not present');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosUserInstance;
