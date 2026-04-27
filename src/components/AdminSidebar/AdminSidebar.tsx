import './AdminSidebar.css'
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

interface AdminSidebarProps {
  activePage: string
  onPageChange: (page: string) => void
}

function AdminSidebar({ activePage, onPageChange }: AdminSidebarProps) {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">AQMS</h1>
        <p className="admin-badge">Admin</p>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onPageChange('dashboard')}
        >
          <MdDashboard className="nav-icon" />
          <span>Admin Dashboard</span>
        </button>
        <button
          className={`nav-item ${activePage === 'services' ? 'active' : ''}`}
          onClick={() => onPageChange('services')}
        >
          <IoSettingsSharp className="nav-icon" />
          <span>Manage Services</span>
        </button>
        <button
          className={`nav-item ${activePage === 'slots' ? 'active' : ''}`}
          onClick={() => onPageChange('slots')}
        >
          <FaClock className="nav-icon" />
          <span>Manage Slots</span>
        </button>
        <button
          className={`nav-item ${activePage === 'appointments' ? 'active' : ''}`}
          onClick={() => onPageChange('appointments')}
        >
          <MdEvent className="nav-icon" />
          <span>Appointments</span>
        </button>
        <button
          className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
          onClick={() => onPageChange('reports')}
        >
          <FaChartBar className="nav-icon" />
          <span>Reports</span>
        </button>
      </nav>
    </div>
  )
}

export default AdminSidebar
