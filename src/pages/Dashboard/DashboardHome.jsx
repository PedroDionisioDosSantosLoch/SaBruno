import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react'

export default function DashboardHome() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Dashboard Escolar</h1>

      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded">
          <Users size={35} />
          <h2 className="text-3xl font-bold mt-3">245</h2>
          <p>Alunos</p>
        </div>
        <div className="bg-white p-5 rounded">
          <GraduationCap size={35} />
          <h2 className="text-3xl font-bold mt-3">18</h2>
          <p>Turmas</p>
        </div>
        <div className="bg-white p-5 rounded">
          <ClipboardList size={35} />
          <h2 className="text-3xl font-bold mt-3">310</h2>
          <p>Matrículas</p>
        </div>
        <div className="bg-white p-5 rounded">
          <BookOpen size={35} />
          <h2 className="text-3xl font-bold mt-3">8.7</h2>
          <p>Média</p>
        </div>
      </div>
    </>
  )
}
