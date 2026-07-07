// Turmas.jsx
export default function Turmas() {
  // depois: useEffect + fetch('http://localhost:5173/classes')
  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Turmas</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Turma</th>
            <th className="text-left">Curso</th>
            <th className="text-left">Alunos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ADS</td>
            <td>Análise e Des. de Sistemas</td>
            <td>32</td>
          </tr>
          <tr>
            <td>Redes</td>
            <td>Redes de Computadores</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
