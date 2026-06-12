import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Ajustar al puerto de tu backend (por defecto 8080)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Puedes agregar interceptores aquí en el futuro para JWT, etc.
api.interceptors.response.use(
  response => response,
  error => {
    // Manejo global de errores
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
