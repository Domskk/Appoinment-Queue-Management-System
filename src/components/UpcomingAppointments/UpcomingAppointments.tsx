import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt } from "react-icons/fa"
import './UpcomingAppointments.css'

interface Appointment {
  id: number
  service: string
  date: string
  time: string
  status: string
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const navigate = useNavigate()

  return (
    <div className="upcoming-appointments">
      <div className="appointments-header">
        <h2>Upcoming Appointments</h2>
        <button className="book-new-btn">Book New →</button>
      </div>

      {appointments.length === 0 ? (
        <div className="no-appointments">
          <FaCalendarAlt className="empty-icon" />
          <p>No upcoming appointments</p>
          <p className="empty-subtext">book a service to get started</p>
          <button className="browse-services-btn" onClick={() => navigate('/services')}>Browse Services</button>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((apt) => (
            <div key={apt.id} className="appointment-card">
              <div className="appointment-status">
                <span className={`status-badge ${apt.status.toLowerCase()}`}>
                  {apt.status}
                </span>
              </div>
              <div className="appointment-details">
                <h3>{apt.service}</h3>
                <p>{apt.date} at {apt.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UpcomingAppointments
