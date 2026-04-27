import './AdminOverview.css'
import { MdEvent } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

function AdminOverview() {
  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Today's Appointments</span>
            <MdEvent className="stat-icon" />
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Active Services</span>
            <FaCheck className="stat-icon" />
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Registered Users</span>
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Available Slots</span>
            <MdEventAvailable className="stat-icon" />
          </div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Appointments This Week</h3>
          <div className="chart-placeholder"></div>
        </div>

        <div className="chart-container">
          <h3>Popular Services</h3>
          <div className="chart-placeholder"></div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
