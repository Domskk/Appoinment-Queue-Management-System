import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import DashboardContent from '../../components/DashboardContent/DashboardContent'
import './Dashboard.css'

interface DashboardProps {
  onLogout: () => void
}

function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('dashboard')

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <DashboardContent 
        activePage={activePage}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default Dashboard
