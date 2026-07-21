import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
  EnrollmentsService,
  StudentsService,
  ClassesService,
} from '../../services/resources'

export default function Matriculas() {
  const [matriculas, setMatriculas] = useState([])
  const [alunos, setAlunos] = useState([])
  const [turmas, setTurmas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ studentId: '', classId: '' })
  const [saving, setSaving] = useState(false)

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [matriculasRes, alunosRes, turmasRes] = await Promise.all([
        EnrollmentsService.getAll(),
        StudentsService.getAll(),
        ClassesService.getAll(),
      ])
      setMatriculas(matriculasRes.data)
      setAlunos(alunosRes.data)
      setTurmas(turmasRes.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Não foi possível carregar as matrículas.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const nomeDoAluno = (id) =>
    alunos.find((a) => a.id === id)?.name || `Aluno #${id}`

  const nomeDaTurma = (id) =>
    turmas.find((t) => t.id === id)?.name || `Turma #${id}`

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.studentId || !form.classId) return

    setSaving(true)
    try {
      await EnrollmentsService.create({
        studentId: Number(form.studentId),
        classId: Number(form.classId),
      })
      setForm({ studentId: '', classId: '' })
      await loadData()
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível criar a matrícula'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await EnrollmentsService.remove(id)
      setMatriculas((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível remover a matrícula'
      )
    }
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Matrículas</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
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
        <select
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
          className="border rounded p-1.5 flex-1"
          required
        >
          <option value="">Selecione a turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Matricular'}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Carregando matrículas...</p>
      ) : matriculas.length === 0 ? (
        <p className="text-gray-500">Nenhuma matrícula registrada ainda.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Registro</th>
              <th className="text-left">Aluno</th>
              <th className="text-left">Turma</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((mat) => (
              <tr key={mat.id}>
                <td>#{mat.id}</td>
                <td>{nomeDoAluno(mat.studentId)}</td>
                <td>{nomeDaTurma(mat.classId)}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(mat.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover matrícula"
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
