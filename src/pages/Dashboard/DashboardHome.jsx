import { useEffect, useState } from 'react'
import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react'
import {
  StudentsService,
  ClassesService,
  EnrollmentsService,
  GradesService,
} from '../../services/resources'

export default function DashboardHome() {
  const [stats, setStats] = useState({
    alunos: 0,
    turmas: 0,
    matriculas: 0,
    notas: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadStats() {
      setLoading(true)
      setError(null)
      try {
        const [alunosRes, turmasRes, matriculasRes, notasRes] = await Promise.all([
          StudentsService.getAll(),
          ClassesService.getAll(),
          EnrollmentsService.getAll(),
          GradesService.getAll(),
        ])

        setStats({
          alunos: alunosRes.data.length,
          turmas: turmasRes.data.length,
          matriculas: matriculasRes.data.length,
          notas: notasRes.data.length,
        })
      } catch (err) {
        setError(err.response?.data?.message || 'Não foi possível carregar os indicadores. Verifique se o back-end está rodando.')
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const cards = [
    { icon: Users, value: stats.alunos, label: 'Alunos' },
    { icon: GraduationCap, value: stats.turmas, label: 'Turmas' },
    { icon: ClipboardList, value: stats.matriculas, label: 'Matrículas' },
    { icon: BookOpen, value: stats.notas, label: 'Notas lançadas' },
  ]

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Dashboard Escolar</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-4 gap-5">
        {cards.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-white p-5 rounded">
            <Icon size={35} />
            <h2 className="text-3xl font-bold mt-3">{loading ? '...' : value}</h2>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </>
  )
}
