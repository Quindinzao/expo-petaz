import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Substitua "localhost" pelo seu IP
  timeout: 1000, // Tempo máximo para a requisição em milissegundos
});

export default api;