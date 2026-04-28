import { useState, useMemo } from 'react'
import './SelectTimeSlot.css'
import { Service } from '../../contexts/ServicesContext'
import { useSlots } from '../../contexts/SlotsContext'

interface SelectTimeSlotProps {
  service: Service
  onSelectTime: (date: string, time: string) => void
  onGoBack: () => void
}

function SelectTimeSlot({ service, onSelectTime, onGoBack }: SelectTimeSlotProps) {
  const { getSlotsByService, bookSlot } = useSlots()
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2))

  const serviceSlots = useMemo(() => getSlotsByService(service.id), [getSlotsByService, service.id])

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

  // Get available slots for selected date
  const availableSlots = useMemo(() => {
    if (!selectedDate) return []
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
    return serviceSlots.filter(slot => slot.date === dateStr && slot.booked < slot.capacity)
  }, [serviceSlots, selectedDate, currentMonth])

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime && selectedSlotId) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
      // Book the slot
      bookSlot(selectedSlotId)
      onSelectTime(dateStr, selectedTime)
    }
  }

  const handleSelectTime = (slotId: number, time: string) => {
    setSelectedSlotId(slotId)
    setSelectedTime(time)
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
            {availableSlots.length === 0 ? (
              <div className="no-slots-message">No available slots for this date</div>
            ) : (
              availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`time-slot ${selectedSlotId === slot.id ? 'selected' : ''}`}
                  onClick={() => handleSelectTime(slot.id, slot.time)}
                >
                  <div className="time-text">{slot.time}</div>
                  <div className="slots-available">{slot.capacity - slot.booked} available</div>
                </button>
              ))
            )}
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
