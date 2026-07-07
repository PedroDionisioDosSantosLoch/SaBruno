export default function Alunos() {
  // depois: useEffect + fetch('http://localhost:5173/students')
  return (
    <div className="bg-white p-5 rounded">
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
        </tbody>
      </table>
    </div>
  )
}
