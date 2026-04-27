import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import AdminDashboardContent from '../../components/AdminDashboardContent/AdminDashboardContent'
import './AdminDashboard.css'

interface AdminDashboardProps {
  onLogout: () => void
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('dashboard')

  const handleLogout = () => {
    onLogout()
    navigate('/admin')
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} />
      <AdminDashboardContent 
        activePage={activePage}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default AdminDashboard
