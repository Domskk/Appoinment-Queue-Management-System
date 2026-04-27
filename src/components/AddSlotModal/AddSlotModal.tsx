import { useState } from 'react'
import './AddSlotModal.css'

interface AddSlotModalProps {
  onClose: () => void
  onAddSlot: (slot: { time: string; service: string; capacity: number }) => void
  selectedDate: Date
}

function AddSlotModal({ onClose, onAddSlot, selectedDate }: AddSlotModalProps) {
  const [formData, setFormData] = useState({
    service: '',
    date: selectedDate,
    time: '09:00 AM',
    capacity: 50,
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [displayMonth, setDisplayMonth] = useState(new Date(selectedDate))

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ]

  const services = [
    'General Consultation',
    'Dental Cleaning',
    'Eye Exam',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) : value,
    }))
  }

  const handleSelectDate = (day: number) => {
    const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
    setFormData(prev => ({ ...prev, date: newDate }))
    setShowDatePicker(false)
  }

  const handlePrevMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.service) {
      onAddSlot({
        service: formData.service,
        time: formData.time,
        capacity: formData.capacity,
      })
      setFormData({
        service: '',
        date: selectedDate,
        time: '09:00 AM',
        capacity: 50,
      })
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(displayMonth)
  const firstDay = getFirstDayOfMonth(displayMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const paddedDays = Array(firstDay).fill(null).concat(days)

  const dateStr = formData.date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Time Slot</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="service">Service *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select service</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <div className="date-selector">
              <input
                type="text"
                value={dateStr}
                readOnly
                className="date-input"
                onClick={() => setShowDatePicker(!showDatePicker)}
              />
              {showDatePicker && (
                <div className="date-picker-dropdown">
                  <div className="calendar-header">
                    <button type="button" onClick={handlePrevMonth}>‹</button>
                    <h4>{monthName}</h4>
                    <button type="button" onClick={handleNextMonth}>›</button>
                  </div>

                  <div className="calendar-grid">
                    <div className="weekday">Su</div>
                    <div className="weekday">Mo</div>
                    <div className="weekday">Tu</div>
                    <div className="weekday">We</div>
                    <div className="weekday">Th</div>
                    <div className="weekday">Fr</div>
                    <div className="weekday">Sa</div>

                    {paddedDays.map((day, idx) => (
                      <div
                        key={idx}
                        className={`calendar-day ${!day ? 'empty' : ''} ${
                          day === formData.date.getDate() && 
                          displayMonth.getMonth() === formData.date.getMonth() ? 'selected' : ''
                        }`}
                        onClick={() => day && handleSelectDate(day)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                max="500"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSlotModal
