// frontend/src/api.js
import axios from 'axios';

// Naya axios instance banayein
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export default API;