import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/routes'
import './AdminLogin.css'

interface AdminLoginProps {
  onLogin: (email: string) => void
}

function AdminLogin({ onLogin }: AdminLoginProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login({ email, password })

      if (res.success) {
        const userData = res.data.user  
        if (userData.role !== 'admin') {
          setError('Access denied. Admin accounts only.')
          setLoading(false)
          return
        } else {
          localStorage.setItem('isAdminLoggedIn', 'true')
        }

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(userData))
        onLogin(email)
        navigate('/admin/dashboard', { replace: true })
      }
    } catch (err) {
      setError('Cannot connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-sidebar">
        <h1 className="admin-logo">AQMS</h1>
        <p className="admin-label">Admin Panel</p>
      </div>
      <div className="admin-form-section">
        <div className="admin-form-container">
          <h2>Admin Login</h2>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>
          <p className="back-link"><a href="/">Back to User Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin