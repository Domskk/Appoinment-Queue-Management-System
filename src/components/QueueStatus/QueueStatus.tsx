import { FiRefreshCcw } from 'react-icons/fi'
import { useAppointments } from '../../contexts/AppointmentsContext'
import './QueueStatus.css'

interface QueueAppointment {
  id: number
  service: string
  date: string
  status: 'pending' | 'completed'
}

interface QueueStatusProps {
  onViewPastAppointment: (appointment: QueueAppointment) => void
}

function QueueStatus({ onViewPastAppointment }: QueueStatusProps) {
  const { appointments } = useAppointments()

  const handleRefresh = () => {
    alert('Queue status refreshed!')
  }

  const activeAppointments: QueueAppointment[] = appointments
    .filter(a => a.status !== 'Completed')
    .map(a => ({
      id: a.id,
      service: a.service,
      date: a.date,
      status: 'pending' as const,
    }))

  const pastAppointments: QueueAppointment[] = appointments
    .filter(a => a.status === 'Completed')
    .map(a => ({
      id: a.id,
      service: a.service,
      date: a.date,
      status: 'completed' as const,
    }))

  return (
    <div className="queue-status">
      <header className="queue-header">
        <div>
          <h1>Queue Status</h1>
          <p>Track your appointment progress</p>
        </div>
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCcw className="refresh-icon" />
          Refresh
        </button>
      </header>

      <div className="queue-content">
        <div className="current-appointment">
          {activeAppointments.length > 0 ? (
            <div className="appointment-item current">
              <div className="appointment-info">
                <strong>{activeAppointments[0].service}</strong>
                <span>{activeAppointments[0].date}</span>
              </div>
              <div className="status-badge pending">⊙ Pending</div>
            </div>
          ) : (
            <div className="no-current-appointment">No active appointment</div>
          )}
        </div>

        <div className="active-appointments">
          <h2>Active Appointments</h2>
          <div className="appointments-list">
            {activeAppointments.length === 0 ? (
              <div className="no-appointments">No active appointments</div>
            ) : (
              activeAppointments.map(apt => (
                <div key={apt.id} className="appointment-item">
                  <div className="appointment-info">
                    <strong>{apt.service}</strong>
                    <span>{apt.date}</span>
                  </div>
                  <div className="status-badge pending">⊙ Pending</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="past-appointments">
          <h2>Past Appointments</h2>
          <div className="appointments-list">
            {pastAppointments.length === 0 ? (
              <div className="no-appointments">No past appointments</div>
            ) : (
              pastAppointments.map(apt => (
                <button
                  key={apt.id}
                  className="appointment-item clickable"
                  onClick={() => onViewPastAppointment(apt)}
                >
                  <div className="appointment-info">
                    <strong>{apt.service}</strong>
                    <span>{apt.date}</span>
                  </div>
                  <div className="status-badge completed">✓ Completed</div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueStatus
