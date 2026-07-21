import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { UsersService } from '../../services/resources'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'aluno',
  })
  const [saving, setSaving] = useState(false)

  async function loadUsuarios() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await UsersService.getAll()
      setUsuarios(data)
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível carregar os usuários'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsuarios()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.role) return

    setSaving(true)
    try {
      await UsersService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      })
      setForm({ name: '', email: '', password: '', role: 'aluno' })
      await loadUsuarios()
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível cadastrar o usuário'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await UsersService.remove(id)
      setUsuarios((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível remover o usuário'
      )
    }
  }

  const roleLabel = (role) => {
    const labels = {
      admin: 'Administrador',
      professor: 'Professor',
      aluno: 'Aluno',
    }
    return labels[role] || role
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border rounded p-1.5"
          required
        >
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
          <option value="admin">Administrador</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Adicionar'}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Carregando usuários...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-gray-500">Nenhum usuário cadastrado ainda.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">E-mail</th>
              <th className="text-left">Função</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{roleLabel(usuario.role)}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover usuário"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
