import Input from '../components/Input'

export default function Cadastro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>

      <div className="w-72">
        <Input />
      </div>
    </div>
  )
}
