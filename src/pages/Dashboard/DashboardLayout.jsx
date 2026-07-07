import { NavLink, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  const linkClass = ({ isActive }) =>
    `w-full text-left p-2 rounded block ${isActive ? 'bg-blue-600' : ''}`

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white p-5">
        <h1 className="text-white text-2xl font-bold mb-8">Senai</h1>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/alunos" className={linkClass}>
            Alunos
          </NavLink>
          <NavLink to="/dashboard/turmas" className={linkClass}>
            Turmas
          </NavLink>
          <NavLink to="/dashboard/notas" className={linkClass}>
            Notas
          </NavLink>
        </nav>
      </aside>

      {/* Conteúdo da subrota atual */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
