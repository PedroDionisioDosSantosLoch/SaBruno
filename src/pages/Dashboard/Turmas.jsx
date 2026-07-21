import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ClassesService } from '../../services/resources'

export default function Turmas() {
  const [turmas, setTurmas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  async function loadTurmas() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await ClassesService.getAll()
      setTurmas(data)
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível carregar as turmas'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTurmas()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name) return

    setSaving(true)
    try {
      await ClassesService.create(form)
      setForm({ name: '', description: '' })
      await loadTurmas()
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível cadastrar a turma'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await ClassesService.remove(id)
      setTurmas((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível remover a turma'
      )
    }
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Turmas</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome da turma"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Descrição / Curso"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-1.5 flex-1"
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
        <p className="text-gray-500">Carregando turmas...</p>
      ) : turmas.length === 0 ? (
        <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Turma</th>
              <th className="text-left">Curso</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id}>
                <td>{turma.name}</td>
                <td>{turma.description || '-'}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(turma.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover turma"
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
