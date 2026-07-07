// Notas.jsx
export default function Notas() {
  // depois: useEffect + fetch('http://localhost:5173/grades')
  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">Notas</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Aluno</th>
            <th className="text-left">Disciplina</th>
            <th className="text-left">Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João</td>
            <td>Programação</td>
            <td>9.0</td>
          </tr>
          <tr>
            <td>Maria</td>
            <td>Redes</td>
            <td>8.4</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
