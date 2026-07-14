import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import DashboardHome from './pages/Dashboard/DashboardHome'
import Alunos from './pages/Dashboard/Alunos'
import Turmas from './pages/Dashboard/Turmas'
import Notas from './pages/Dashboard/Notas'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="alunos" element={<Alunos />} />
            <Route path="turmas" element={<Turmas />} />
            <Route path="notas" element={<Notas />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
