import axios from 'axios';

<<<<<<< Updated upstream
// Porta do back-end atual (Back/server.js está em app.listen(3001, ...))
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
=======
<<<<<<< HEAD
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';
=======
// Porta do back-end atual (Back/server.js está em app.listen(3001, ...))
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
>>>>>>> Stashed changes

const api = axios.create({
  baseURL: API_BASE_URL,
});

<<<<<<< HEAD
export default api;
=======
// Anexa o token JWT (se existir) em toda requisição, no header que o
// authMiddleware do back-end espera: "Authorization: Bearer <token>"
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sabruno_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

<<<<<<< Updated upstream
// Anexa o token JWT (se existir) em toda requisição, no header que o
// authMiddleware do back-end espera: "Authorization: Bearer <token>"
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sabruno_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
=======
export default api
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
>>>>>>> Stashed changes
