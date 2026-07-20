import { createContext, useContext, useState } from 'react';
import { UsersService } from '../services/resources';

const AuthContext = createContext();

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
// Decodifica o "meio" do JWT (o payload) sem precisar de nenhuma lib extra.
// Um token JWT tem 3 partes separadas por ".": header.payload.assinatura
function decodeToken(token) {
  const payloadBase64 = token.split('.')[1]
  const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(payloadJson)
}

<<<<<<< Updated upstream
=======
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
>>>>>>> Stashed changes
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
<<<<<<< Updated upstream
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

=======
<<<<<<< HEAD
      setLoading(true);
      setError('');

      const { data } = await UsersService.login({
        email,
        password,
      });

      if (!data.user) {
        setError('E-mail ou senha inválidos');
        return false;
      }

      if (data.user.role !== 'admin') {
        setError('Apenas administradores podem acessar o sistema.');
        return false;
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));

      return true;
=======
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

>>>>>>> Stashed changes
      const userSemSenha = { ...dadosUsuario }
      delete userSemSenha.password
      localStorage.setItem('sabruno_user', JSON.stringify(userSemSenha))
      setUser(userSemSenha)
<<<<<<< Updated upstream

      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível entrar. Verifique se o back-end está rodando.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])
=======
>>>>>>> Stashed changes

      return true
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
    } catch (err) {
      setError(
        err.response?.data?.message || 'Erro ao realizar login.'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
=======
  const logout = useCallback(() => {
    localStorage.removeItem('sabruno_user')
    localStorage.removeItem('sabruno_token')
    setUser(null)
  }, [])

  const isAuthenticated = Boolean(user)
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
<<<<<<< HEAD
  return useContext(AuthContext);
=======
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return ctx
<<<<<<< Updated upstream
=======
>>>>>>> f8cda5e035c3a0d5f5725b0cc8737d8616819ee7
>>>>>>> Stashed changes
}