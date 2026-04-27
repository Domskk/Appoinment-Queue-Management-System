import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

interface AdminLoginProps {
  onLogin: (email: string) => void
}

function AdminLogin({ onLogin }: AdminLoginProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const validEmail = 'admin@aqms.com'
    const validPassword = 'admin123'
    
    if (email === validEmail && password === validPassword) {
      onLogin(email)
      navigate('/admin/dashboard')
    } else {
      alert('Invalid admin credentials. Use admin@aqms.com / admin123')
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
            <button type="submit" className="admin-login-btn">Login as Admin</button>
          </form>
          <p className="back-link"><a href="/">Back to User Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
