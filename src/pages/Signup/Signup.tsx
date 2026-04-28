import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

interface SignupProps {
  onSignup: (email: string, fullName: string) => void
}

function Signup({ onSignup }: SignupProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && confirmPassword && password === confirmPassword && name) {
      localStorage.setItem('aqms_user', JSON.stringify({ email, fullName: name }))
      onSignup(email, name)
      navigate('/dashboard')
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-sidebar">
        <h1 className="sidebar-logo">AQMS</h1>
        <div className="sidebar-quote">
          <p className="quote-line">"Start your journey</p>
          <p className="quote-line">to smarter care."</p>
          <img src="/AQMS.logo.png" alt="AQMS Logo" />
        </div>
      </div>

      <div className="signup-form-section">
        <div className="signup-form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="login-text">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default Signup
