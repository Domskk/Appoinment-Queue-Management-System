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

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [, setAdminEmail] = useState('')

  const handleUserLogin = (email: string, fullName?: string) => {
    setIsUserLoggedIn(true)
    setUserEmail(email)
    if (fullName) {
      setUserFullName(fullName)
    }
  }

  const handleUserLogout = () => {
    setIsUserLoggedIn(false)
    setUserEmail('')
    setUserFullName('')
    localStorage.removeItem('aqms_user')
  }

  const handleAdminLogin = (email: string) => {
    setIsAdminLoggedIn(true)
    setAdminEmail(email)
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    setAdminEmail('')
  }

  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isUserLoggedIn ? <Login onLogin={handleUserLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isUserLoggedIn ? <Signup onSignup={handleUserLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isUserLoggedIn ? <Dashboard onLogout={handleUserLogout} userFullName={userFullName || userEmail.split('@')[0]} /> : <Navigate to="/" />} />
        <Route path="/services" element={isUserLoggedIn ? <Services /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={!isAdminLoggedIn ? <AdminLogin onLogin={handleAdminLogin} /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
      </Routes>
    </Router>
  )
}

export default App
