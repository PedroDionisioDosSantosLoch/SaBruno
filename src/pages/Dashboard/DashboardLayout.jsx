import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `w-full text-left p-2 rounded block ${isActive ? 'bg-blue-600' : ''}`

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white p-5 flex flex-col justify-between">
        <div>
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
            <NavLink to="/dashboard/matriculas" className={linkClass}>
              Matrículas
            </NavLink>
            <NavLink to="/dashboard/usuarios" className={linkClass}>
              Usuários
            </NavLink>
          </nav>
        </div>

        <div className="border-t border-slate-700 pt-4">
          {user && (
            <p className="text-sm text-slate-300 mb-2 truncate">{user.name}</p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo da subrota atual */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
