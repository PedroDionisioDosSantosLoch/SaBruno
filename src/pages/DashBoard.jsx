import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8 text-white">Senai</h1>

        <nav className="space-y-2">
          <button className="w-full text-left p-2 bg-blue-600 rounded">
            Dashboard
          </button>
          <button className="w-full text-left p-2">Alunos</button>
          <button className="w-full text-left p-2">Turmas</button>
          <button className="w-full text-left p-2">Notas</button>
          <button className="w-full text-left p-2">Usuários</button>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Escolar</h1>

        {/* Cards */}
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

        {/* Tabela */}
        <div className="bg-white mt-8 p-5 rounded">
          <h2 className="text-xl font-bold mb-4">Alunos</h2>

          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Nome</th>
                <th className="text-left">Turma</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>João</td>
                <td>ADS</td>
                <td>Ativo</td>
              </tr>

              <tr>
                <td>Maria</td>
                <td>Redes</td>
                <td>Ativo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
