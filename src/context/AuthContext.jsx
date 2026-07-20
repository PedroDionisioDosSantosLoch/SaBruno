import { createContext, useContext, useState, useCallback } from 'react'
import { UsersService } from '../services/resources'

const AuthContext = createContext(null)

// Decodifica o "meio" do JWT (o payload) sem precisar de nenhuma lib extra.
// Um token JWT tem 3 partes separadas por ".": header.payload.assinatura
function decodeToken(token) {
  const payloadBase64 = token.split('.')[1]
  const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(payloadJson)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sabruno_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, senha) => {
    setLoading(true)
    setError(null)
    try {
      // 1. Manda email/senha pro back-end, que confere o hash com bcrypt
      //    e devolve um token JWT (contendo id + role) se estiver certo
      const { data } = await UsersService.login(email, senha)
      const { token } = data

      // 2. Guarda o token — é ele que o interceptor do api.js vai anexar
      //    em toda requisição daqui pra frente
      localStorage.setItem('sabruno_token', token)

      // 3. O token só carrega id e role, não o nome. Como o dashboard
      //    mostra o nome do usuário, buscamos os dados completos.
      const { id } = decodeToken(token)
      const { data: dadosUsuario } = await UsersService.getById(id)

      const userSemSenha = { ...dadosUsuario }
      delete userSemSenha.password
      localStorage.setItem('sabruno_user', JSON.stringify(userSemSenha))
      setUser(userSemSenha)

      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível entrar. Verifique se o back-end está rodando.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('sabruno_user')
    localStorage.removeItem('sabruno_token')
    setUser(null)
  }, [])

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return ctx
}