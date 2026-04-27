import './ConfirmBooking.css'

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

interface ConfirmBookingProps {
  bookingData: BookingData
  onConfirm: () => void
  onGoBack: () => void
}

function ConfirmBooking({ bookingData, onConfirm, onGoBack }: ConfirmBookingProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="confirm-booking">
      <header className="confirm-header">
        <button className="back-btn" onClick={onGoBack}>← Back</button>
        <h1>Confirm Booking</h1>
      </header>

      <div className="confirm-content">
        <div className="booking-summary">
          <h2>Booking Summary</h2>

          {bookingData.service && (
            <>
              <div className="summary-item">
                <div className="summary-icon">●</div>
                <div className="summary-info">
                  <div className="label">Service</div>
                  <div className="value">{bookingData.service.name}</div>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon">●</div>
                <div className="summary-info">
                  <div className="label">Date & Time</div>
                  <div className="value">{formatDate(bookingData.date)} at {bookingData.time}</div>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon">●</div>
                <div className="summary-info">
                  <div className="label">Duration</div>
                  <div className="value">{bookingData.service.duration} minutes</div>
                </div>
              </div>
            </>
          )}

          <button className="confirm-btn" onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBooking
