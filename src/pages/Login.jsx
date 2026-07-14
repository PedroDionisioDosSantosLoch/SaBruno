import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButonEntrar from '../components/ButonEntrar'
import Input from '../components/Input'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login(email, senha)
    if (ok) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Acessar sua conta</h1>
        <p className="text-sm text-gray-500 mt-1">
          Área restrita ao administrador.
        </p>
      </div>

      <Input
        placeholder="E-mail:"
        icon={Mail}
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="Senha:"
        icon={Lock}
        type="password"
        name="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      {error && <p className="text-sm text-red-600 w-72">{error}</p>}

      <ButonEntrar disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </ButonEntrar>
    </form>
  )
}
