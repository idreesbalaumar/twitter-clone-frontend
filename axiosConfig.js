import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Example base URL
});

export default instance;