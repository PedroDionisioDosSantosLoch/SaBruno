import { createContext, useContext, useState, useCallback } from 'react'
import { UsersService } from '../services/resources'

const AuthContext = createContext(null)

// IMPORTANTE: o back-end atual (Back/) não tem uma rota de login nem faz hash
// de senha (ver Back/controllers/UserController.js). Como a tarefa pediu para
// mexer só no front, o "login" aqui é feito buscando a lista de usuários
// (GET /users) e comparando e-mail/senha no navegador — e só deixa entrar
// quem tiver role "admin", já que este app é de acesso restrito ao admin.
// Não é seguro para produção: o ideal é depois criar uma rota POST
// /users/login no back que faça essa checagem com a senha criptografada.
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
      const { data: usuarios } = await UsersService.getAll()
      const encontrado = usuarios.find(
        (u) => u.email === email && u.password === senha
      )

      if (!encontrado) {
        setError('E-mail ou senha inválidos')
        return false
      }

      if (encontrado.role !== 'admin') {
        setError('Apenas administradores podem acessar este painel')
        return false
      }

      const userSemSenha = { ...encontrado }
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
