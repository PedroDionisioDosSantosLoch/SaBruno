import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { GradesService, StudentsService } from '../../services/resources'

export default function Notas() {
  const [notas, setNotas] = useState([])
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ nota: '', studentId: '' })
  const [saving, setSaving] = useState(false)

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [notasRes, alunosRes] = await Promise.all([
        GradesService.getAll(),
        StudentsService.getAll(),
      ])
      setNotas(notasRes.data)
      setAlunos(alunosRes.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Não foi possível carregar as notas. Verifique se o back-end está rodando.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const nomeDoAluno = (studentId) =>
    alunos.find((a) => a.id === studentId)?.name || `Aluno #${studentId}`

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.nota || !form.studentId) return

    setSaving(true)
    try {
      await GradesService.create({
        nota: Number(form.nota),
        studentId: Number(form.studentId),
      })
      setForm({ nota: '', studentId: '' })
      await loadData()
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível lançar a nota')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await GradesService.remove(id)
      setNotas((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível remover a nota')
    }
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Notas</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="number"
          step="0.1"
          placeholder="Nota"
          value={form.nota}
          onChange={(e) => setForm({ ...form, nota: e.target.value })}
          className="border rounded p-1.5 w-24"
          required
        />
        <select
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        >
          <option value="">Selecione o aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Lançar'}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Carregando notas...</p>
      ) : notas.length === 0 ? (
        <p className="text-gray-500">Nenhuma nota lançada ainda.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Registro</th>
              <th className="text-left">Nota</th>
              <th className="text-left">Aluno</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <tr key={nota.id}>
                <td>#{nota.id}</td>
                <td>{nota.nota}</td>
                <td>{nota.Student?.name || nomeDoAluno(nota.studentId)}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(nota.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover nota"
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
