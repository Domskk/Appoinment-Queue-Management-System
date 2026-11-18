import { useState } from 'react'
import './ConfirmBooking.css'

interface Service { id: number; name: string; duration: number }
interface BookingData { service: Service | null; date: string; time: string }
interface BookingResult {
  queue_number: number
  appointment_date: string
  appointment_time: string
  estimated_end: string
}
interface ConfirmBookingProps {
  bookingData: BookingData
  onConfirm: () => Promise<BookingResult | null>
  onGoBack: () => void
  loading?: boolean
}

function ConfirmBooking({ bookingData, onConfirm, onGoBack, loading }: ConfirmBookingProps) {
  const [result, setResult] = useState<BookingResult | null>(null)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (time: string) => {
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${display}:${m} ${ampm}`
  }

  const handleConfirm = async (): Promise<void> => {
    setConfirming(true)
    setError('')

    try {
      const res = await onConfirm()
      if (res) {
        setResult(res)
      }
    } catch {
      setError('Cannot connect to server')
    } finally {
      setConfirming(false)
    }
  }

  // ── Success screen ───────────────────────────────────────
  if (result) {
    return (
      <div className="confirm-booking">
        <div className="confirm-content">
          <div className="booking-success">
            <div className="success-icon">✓</div>
            <h2>Appointment Confirmed!</h2>

            <div className="booking-summary">
              <div className="summary-item">
                <div className="label">Service</div>
                <div className="value">{bookingData.service?.name}</div>
              </div>
              <div className="summary-item">
                <div className="label">Your Appointment Time</div>
                <div className="value highlight">
                  {formatDate(result.appointment_date)} at {formatTime(result.appointment_time)}
                </div>
              </div>
              <div className="summary-item">
                <div className="label">Estimated End</div>
                <div className="value">{formatTime(result.estimated_end)}</div>
              </div>
              <div className="summary-item">
                <div className="label">Queue Number</div>
                <div className="value queue-number">#{result.queue_number}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Confirm screen ───────────────────────────────────────
  return (
    <div className="confirm-booking">
      <header className="confirm-header">
        <button className="back-btn" onClick={onGoBack}>← Back</button>
        <h1>Confirm Booking</h1>
      </header>
      <div className="confirm-content">
        <div className="booking-summary">
          <h2>Booking Summary</h2>

          {error && (
            <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
          )}

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
                  <div className="label">Slot Date & Time</div>
                  <div className="value">
                    {formatDate(bookingData.date)} at {formatTime(bookingData.time)}
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">●</div>
                <div className="summary-info">
                  <div className="label">Duration per person</div>
                  <div className="value">{bookingData.service.duration} minutes</div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">●</div>
                <div className="summary-info">
                  <div className="label">Your time</div>
                  <div className="value">
                    Calculated after confirming based on your queue position
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={confirming || loading}
          >
            {confirming ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBooking