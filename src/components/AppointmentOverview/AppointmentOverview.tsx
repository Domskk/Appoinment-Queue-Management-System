import { FaCalendarAlt, FaCheckCircle, FaUsers } from "react-icons/fa"
import './AppointmentOverview.css'

interface AppointmentOverviewProps {
  upcoming: number
  completed: number
  queuePosition: number | string
}

function AppointmentOverview({ upcoming, completed, queuePosition }: AppointmentOverviewProps) {
  return (
    <div className="appointment-overview">
      <div className="overview-card">
        <div className="card-header">
          <span>Upcoming</span>
          <FaCalendarAlt className="card-icon" style={{ color: '#2f6f73' }} />
        </div>
        <div className="card-value">{upcoming}</div>
      </div>

      <div className="overview-card">
        <div className="card-header">
          <span>Completed</span>
          <FaCheckCircle className="card-icon" style={{ color: '#2f6f73' }}/>
        </div>
        <div className="card-value">{completed}</div>
      </div>

      <div className="overview-card">
        <div className="card-header">
          <span>Queue Position</span>
          <FaUsers className="card-icon" style={{ color: '#2f6f73' }}/>
        </div>
        <div className="card-value">{queuePosition}</div>
      </div>
    </div>
  )
}

export default AppointmentOverview
