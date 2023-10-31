import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: "http://api.charmglowjewelry.com/api", // Your API base URL
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});

export default axiosInstance;
