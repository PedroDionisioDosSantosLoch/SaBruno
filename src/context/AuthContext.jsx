import { createContext, useContext, useState } from 'react';
import { UsersService } from '../services/resources';

const AuthContext = createContext();

function decodeToken(token) {
  const payloadBase64 = token.split('.')[1];
  const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(payloadJson);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');

      const { data } = await UsersService.login({ email, password });
      const token = data.token;

      if (!token) {
        setError('Token não recebido do servidor.');
        return false;
      }

      localStorage.setItem('sabruno_token', token);

      const { id } = decodeToken(token);
      const { data: dadosUsuario } = await UsersService.getById(id);

      const userSemSenha = { ...dadosUsuario };
      delete userSemSenha.password;

      localStorage.setItem('sabruno_user', JSON.stringify(userSemSenha));
      setUser(userSemSenha);

      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível entrar. Verifique se o back-end está rodando.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sabruno_user');
    localStorage.removeItem('sabruno_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return ctx;
}