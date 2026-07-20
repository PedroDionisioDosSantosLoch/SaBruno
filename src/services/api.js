import axios from 'axios'

// Porta do back-end atual (Back/server.js está em app.listen(3001, ...))
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

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