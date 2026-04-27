import { FiRefreshCcw } from 'react-icons/fi'
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
  const handleRefresh = () => {
    // Refresh queue status - integrate with backend later
    alert('Queue status refreshed!')
  }

  const currentAppointment = {
    service: 'General Consultation',
    date: 'Monday, March 9',
    queueNumber: 1,
    estimatedWait: '0m',
    nowServing: 1
  }

  const activeAppointments: QueueAppointment[] = []

  const pastAppointments: QueueAppointment[] = []

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
          <div className="appointment-title">{currentAppointment.service}</div>
          <div className="appointment-date">{currentAppointment.date}</div>
          <div className="status-badge pending">⊙ Pending</div>

          <div className="queue-info-grid">
            <div className="queue-info-box">
              <div className="info-label">Your Number</div>
              <div className="info-value">#{currentAppointment.queueNumber}</div>
            </div>
            <div className="queue-info-box">
              <div className="info-label">Est. Wait</div>
              <div className="info-value">{currentAppointment.estimatedWait}</div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">Queue Progress</div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="progress-info">
              <span>Now Serving: #{currentAppointment.nowServing}</span>
              <span>Your Number: #{currentAppointment.queueNumber}</span>
            </div>
          </div>
        </div>

        <div className="active-appointments">
          <h2>Active Appointments</h2>
          <div className="appointments-list">
            {activeAppointments.length === 0 ? (
              <div className="no-appointments">No active appointments</div>
            ) : (
              activeAppointments.map(apt => (
                <div key={apt.id} className="appointment-item">
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
