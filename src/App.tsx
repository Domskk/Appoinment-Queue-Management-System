import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Signup from './pages/Signup/Signup'
import Services from './pages/Services/Services'
import './App.css'

// Read initial state from localStorage so refresh doesn't log you out
function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('user') || '{}') } catch { return {} }
}

function App() {
  const storedUser = getStoredUser()

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem('token') && storedUser.role === 'user'
  )
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem('token') && storedUser.role === 'admin'
  )
  const [userFullName, setUserFullName] = useState(
    storedUser.name || ''
  )

  const handleUserLogin = (email: string, fullName?: string) => {
    setIsUserLoggedIn(true)
    setUserFullName(fullName || email.split('@')[0])
  }

  const handleUserLogout = () => {
    setIsUserLoggedIn(false)
    setUserFullName('')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const handleAdminLogin = (_email: string) => {
    setIsAdminLoggedIn(true)
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isAdminLoggedIn')
  }

  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!isUserLoggedIn ? <Login onLogin={handleUserLogin} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={!isUserLoggedIn ? <Signup onSignup={handleUserLogin} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={isUserLoggedIn ? <Dashboard onLogout={handleUserLogout} userFullName={userFullName} /> : <Navigate to="/" replace />} />
        <Route path="/services" element={isUserLoggedIn ? <Services /> : <Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={!isAdminLoggedIn ? <AdminLogin onLogin={handleAdminLogin} /> : <Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  )
}

export default App