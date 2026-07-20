import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { StudentsService } from '../../services/resources'

export default function Alunos() {
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', sala: '', endereco: '' })
  const [saving, setSaving] = useState(false)

  async function loadAlunos() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await StudentsService.getAll()
      setAlunos(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível carregar os alunos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- busca inicial de dados na montagem
    loadAlunos()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name || !form.sala || !form.endereco) return

    setSaving(true)
    try {
      await StudentsService.create({
        name: form.name,
        sala: Number(form.sala),
        endereco: form.endereco,
      })
      setForm({ name: '', sala: '', endereco: '' })
      await loadAlunos()
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível cadastrar o aluno')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await StudentsService.remove(id)
      setAlunos((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível remover o aluno')
    }
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Alunos</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
        <input
          type="number"
          placeholder="Sala"
          value={form.sala}
          onChange={(e) => setForm({ ...form, sala: e.target.value })}
          className="border rounded p-1.5 w-24"
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={form.endereco}
          onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
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
        <p className="text-gray-500">Carregando alunos...</p>
      ) : alunos.length === 0 ? (
        <p className="text-gray-500">Nenhum aluno cadastrado ainda.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nome</th>
              <th className="text-left">Sala</th>
              <th className="text-left">Endereço</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.name}</td>
                <td>{aluno.sala}</td>
                <td>{aluno.endereco}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(aluno.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover aluno"
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