import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

interface LoginProps {
  onLogin: (email: string) => void
}

function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin(email)
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <h1 className="sidebar-logo">AQMS</h1>
        <div className="sidebar-quote">
          <p className="quote-line">"Smart queues.</p>
          <p className="quote-line">Seamless care."</p>
          <img src="/AQMS.logo.png" alt="AQMS Logo" />
          <p className="sidebar-subtitle">Appointment Queue Management System</p>
        </div>
      </div>
      
      <div className="login-form-section">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
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
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-text">Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span>.</p>
          <p className="admin-link-text">Are you an admin? <a href="/admin" className="admin-link">Go to Admin Panel</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
