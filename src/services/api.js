import axios from 'axios'

// Back/server.js sobe o Express na porta 5173 (Back/server.js, app.listen(5173, ...)).
// Se você rodar o back e o "npm run dev" (Vite) ao mesmo tempo na mesma máquina,
// vai dar conflito de porta, já que os dois usam 5173 por padrão — isso é algo do
// back-end que não foi alterado aqui. Se quiser, dá pra me pedir depois para mudar
// a porta do servidor Express.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default api
