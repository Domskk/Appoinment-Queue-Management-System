import './BookingConfirmed.css'

interface Service {
  id: number
  name: string
  duration: number
}

interface BookingData {
  service: Service | null
  date: string
  time: string
}

interface BookingConfirmedProps {
  bookingData: BookingData
  queueNumber: number
  onGoToDashboard: () => void
  onTrackQueue: () => void
}

function BookingConfirmed({ bookingData, queueNumber, onGoToDashboard, onTrackQueue }: BookingConfirmedProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="booking-confirmed">
      <div className="confirmed-container">
        <div className="success-icon">✓</div>
        <h1>Appointment Booked!</h1>
        <p className="confirmed-message">Your queue number has been assigned</p>

        <div className="queue-number-box">
          <div className="queue-label">Your Queue Number</div>
          <div className="queue-number">#{queueNumber}</div>
        </div>

        {bookingData.service && (
          <div className="booking-details">
            <div className="detail-row">
              <span className="detail-label">Service</span>
              <span className="detail-value">{bookingData.service.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(bookingData.date)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time</span>
              <span className="detail-value">{bookingData.time}</span>
            </div>
          </div>
        )}

        <div className="confirmed-actions">
          <button className="secondary-btn" onClick={onGoToDashboard}>
            Go To Dashboard
          </button>
          <button className="primary-btn" onClick={onTrackQueue}>
            Track Queue
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmed
