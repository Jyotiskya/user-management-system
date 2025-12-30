import axios from 'axios';
const API_URL = 'https://user-management-system-eixh.onrender.com'; 

const api = axios.create({
    baseURL: API_URL,
});

export default api;