import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: `${process.env.BASE_URL_API}`, // Your API base URL
});

export default axiosInstance;
