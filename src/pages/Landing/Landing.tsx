import { useNavigate } from 'react-router-dom'
import { FaCalendarCheck, FaUserClock, FaTachometerAlt } from "react-icons/fa";
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-content">
          <h1 className="logo">AQMS</h1>
          <div className="header-buttons">
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-left">
          <div className="hero-text-content">
            <h2 className="hero-title">Appointment Queue Management System</h2>
            <p className="hero-description">Say goodbye to long waiting times and manual booking hassles.</p>
            <p className="hero-description">Manage patient flow efficiently — from online booking to real-time queue tracking.</p>
            <button className="hero-cta" onClick={() => navigate('/signup')}>Get Started</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="envelope-icon">
            <img src="/AQMS.logo.png" alt="AQMS Logo" />
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon blue"><FaCalendarCheck size={28} /></div>
          <h3 className="feature-title">Easy Scheduling</h3>
          <p className="feature-desc">Book appointments online in just a few clicks. Choose your preferred service and time slot instantly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon green"><FaUserClock size={28} /></div>
          <h3 className="feature-title">Real-Time Queue</h3>
          <p className="feature-desc">Track your position in the queue live. Get notified when it's almost your turn — no more waiting around.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon purple"><FaTachometerAlt size={28} /></div>
          <h3 className="feature-title">Admin Dashboard</h3>
          <p className="feature-desc">Powerful tools for administrators to manage services, time slots, appointments, and generate reports.</p>
        </div>
      </section>
    </div>
  )
}

export default Landing
