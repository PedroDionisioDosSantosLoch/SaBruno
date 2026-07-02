import ButonEntrar from '../components/ButonEntrar'
import Input from '../components/Input'
import { User, Mail, Lock } from 'lucide-react'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Acessar sua conta</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bem-vindo de volta! Insira seus dados.
        </p>
      </div>

      <Input placeholder="Nome:" icon={User} />
      <Input placeholder="E-mail:" icon={Mail} />
      <Input placeholder="Senha:" icon={Lock} />

      <ButonEntrar />
    </div>
  )
}
