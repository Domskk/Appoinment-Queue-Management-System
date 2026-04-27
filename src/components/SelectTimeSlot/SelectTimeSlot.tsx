import { useState } from 'react'
import './SelectTimeSlot.css'

interface Service {
  id: number
  name: string
  duration: number
}

interface SelectTimeSlotProps {
  service: Service
  onSelectTime: (date: string, time: string) => void
  onGoBack: () => void
}

function SelectTimeSlot({ service, onSelectTime, onGoBack }: SelectTimeSlotProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)) // March 2026

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const timeSlots = [
    { time: '09:00 AM', available: 2 },
    { time: '11:00 AM', available: 3 }
  ]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
      onSelectTime(dateStr, selectedTime)
    }
  }

  return (
    <div className="select-time-slot">
      <header className="time-slot-header">
        <button className="back-btn" onClick={onGoBack}>← Back</button>
        <div>
          <h1>Select Time Slot</h1>
          <p>Booking: {service.name}</p>
        </div>
      </header>

      <div className="time-slot-content">
        <div className="calendar-section">
          <div className="date-label">Select Date</div>
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={handlePrevMonth}>‹</button>
              <span>{monthName}</span>
              <button onClick={handleNextMonth}>›</button>
            </div>
            <div className="calendar-weekdays">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="calendar-days">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="empty-day"></div>
              ))}
              {days.map(day => (
                <button
                  key={day}
                  className={`day ${selectedDate === day ? 'selected' : ''} ${day < 9 ? 'disabled' : ''}`}
                  onClick={() => setSelectedDate(day)}
                  disabled={day < 9}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="time-slots-section">
          <div className="time-slots-header">
            <div className="slots-title">Available Slots</div>
            {selectedDate && (
              <div className="selected-date">Monday, March {selectedDate}, 2026</div>
            )}
          </div>
          <div className="time-slots">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTime === slot.time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(slot.time)}
              >
                <div className="time-text">{slot.time}</div>
                <div className="slots-available">{slot.available} available</div>
              </button>
            ))}
          </div>

          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectTimeSlot
