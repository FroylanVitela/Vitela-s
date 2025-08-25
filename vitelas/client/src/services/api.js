import axios from 'axios';

// Vite: import.meta.env.VITE_API_URL
// CRA:  process.env.REACT_APP_API_URL
const viteUrl = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL;
const craUrl  = typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL;
const baseURL = viteUrl || craUrl || 'http://localhost:5000/api';

const api = axios.create({ baseURL });

export default api;