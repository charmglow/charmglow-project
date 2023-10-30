import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Your API base URL
});

export default axiosInstance;
