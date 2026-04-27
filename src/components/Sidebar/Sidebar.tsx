import { FaHome } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa"
import { FaList } from "react-icons/fa6"
import { CgProfile } from "react-icons/cg"
import './Sidebar.css'

interface SidebarProps {
  activePage: string
  onPageChange: (page: string) => void
}

function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">AQMS</h1>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onPageChange('dashboard')}
        >
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-item ${activePage === 'services' ? 'active' : ''}`}
          onClick={() => onPageChange('services')}
        >
          <FaCalendar className="nav-icon" />
          <span>Services</span>
        </button>
        <button
          className={`nav-item ${activePage === 'queue' ? 'active' : ''}`}
          onClick={() => onPageChange('queue')}
        >
          <FaList className="nav-icon" />
          <span>My Queue</span>
        </button>
        <button
          className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
          onClick={() => onPageChange('profile')}
        >
          <CgProfile className="nav-icon" />
          <span>My Profile</span>
        </button>
      </nav>
    </div>
  )
}

export default Sidebar
