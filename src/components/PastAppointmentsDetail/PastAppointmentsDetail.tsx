import './PastAppointmentsDetail.css'

interface PastAppointmentsDetailProps {
  appointment?: {
    id: number
    service: string
    date: string
    status: 'pending' | 'confirmed' | 'serving' | 'completed'
  }
  onGoBack: () => void
}

function PastAppointmentsDetail({ appointment, onGoBack }: PastAppointmentsDetailProps) {
  return (
    <div className="past-appointments-detail">
      <header className="detail-header">
        <button className="back-btn" onClick={onGoBack}>← Back</button>
      </header>

      <div className="detail-content">
        <h1>{appointment ? appointment.service : 'Past Appointments'}</h1>

        {appointment && (
          <div className="appointment-detail-card">
            <p><strong>Date:</strong> {appointment.date}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${appointment.status}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </p>
          </div>
        )}

        <div className="detail-appointments">
          <div className="no-appointments">No additional details available</div>
        </div>
      </div>
    </div>
  )
}

export default PastAppointmentsDetail