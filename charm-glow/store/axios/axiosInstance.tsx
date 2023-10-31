import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: "http://api.charmglowjewelry.com/api", // Your API base URL
});

export default axiosInstance;
