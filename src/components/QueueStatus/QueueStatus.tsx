import { useEffect } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import { useAppointments } from '../../contexts/AppointmentsContext'
import './QueueStatus.css'

interface QueueAppointment {
  id: number
  service: string
  date: string
  status: 'pending' | 'confirmed' | 'serving' | 'completed'
}

interface QueueStatusProps {
  onViewPastAppointment: (appointment: QueueAppointment) => void
}

function QueueStatus({ onViewPastAppointment }: QueueStatusProps) {
  const { appointments, loading, fetchUserAppointments } = useAppointments()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) fetchUserAppointments(String(user.id))
  }, [])

  const handleRefresh = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) fetchUserAppointments(String(user.id))
  }

  const activeAppointments: QueueAppointment[] = appointments
    .filter(a => a.status !== 'Completed')
    .map(a => ({
      id: a.id,
      service: a.service,
      date: a.date,
      status: a.status.toLowerCase() as 'pending' | 'confirmed' | 'serving' | 'completed'
    }))

  const pastAppointments: QueueAppointment[] = appointments
    .filter(a => a.status === 'Completed')
    .map(a => ({
      id: a.id,
      service: a.service,
      date: a.date,
      status: 'completed' as const
    }))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':    return '⊙ Pending'
      case 'confirmed':  return '✓ Confirmed'
      case 'serving':    return '▶ Serving'
      case 'completed':  return '✓ Completed'
      default:           return status
    }
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>

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
        {/* Current/top active appointment */}
        <div className="current-appointment">
          {activeAppointments.length > 0 ? (
            <div className="appointment-item current">
              <div className="appointment-info">
                <strong>{activeAppointments[0].service}</strong>
                <span>{activeAppointments[0].date}</span>
              </div>
              <div className={`status-badge ${activeAppointments[0].status}`}>
                {getStatusBadge(activeAppointments[0].status)}
              </div>
            </div>
          ) : (
            <div className="no-current-appointment">No active appointment</div>
          )}
        </div>

        {/* All active appointments */}
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
                  <div className={`status-badge ${apt.status}`}>
                    {getStatusBadge(apt.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Past appointments */}
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
                  <div className="status-badge completed">
                    ✓ Completed
                  </div>
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