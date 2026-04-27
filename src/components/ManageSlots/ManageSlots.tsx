import { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AddSlotModal from '../AddSlotModal/AddSlotModal'
import './ManageSlots.css'

interface TimeSlot {
  id: number
  time: string
  service: string
  capacity: number
  booked: number
}

function ManageSlots() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 9)) // March 9, 2026
  const [slots, setSlots] = useState<TimeSlot[]>([
    { id: 1, time: '09:00 AM', service: 'General Consultation', capacity: 50, booked: 3 },
    { id: 2, time: '10:00 AM', service: 'Dental Cleaning', capacity: 30, booked: 15 },
    { id: 3, time: '02:00 PM', service: 'Eye Exam', capacity: 25, booked: 8 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddSlot = (newSlot: { time: string; service: string; capacity: number }) => {
    const slot: TimeSlot = {
      ...newSlot,
      booked: 0,
      id: Math.max(...slots.map(s => s.id), 0) + 1,
    }
    setSlots([...slots, slot])
    setIsModalOpen(false)
  }

  const handleDeleteSlot = (id: number) => {
    setSlots(slots.filter(s => s.id !== id))
  }

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }

  const handleSelectDate = (day: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(selectedDate)
  const firstDay = getFirstDayOfMonth(selectedDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const paddedDays = Array(firstDay).fill(null).concat(days)

  const selectedDateStr = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="manage-slots">
      <div className="manage-slots-header">
        <h2>Manage Slots</h2>
        <button className="btn-add-slot" onClick={() => setIsModalOpen(true)}>
          + Add Slots
        </button>
      </div>

      <div className="slots-container">
        {/* Calendar */}
        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>‹</button>
            <h3>{monthName}</h3>
            <button onClick={handleNextMonth}>›</button>
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
                  day === selectedDate.getDate() ? 'selected' : ''
                }`}
                onClick={() => day && handleSelectDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Slots Table */}
        <div className="slots-section">
          <div className="slots-header">
            <div className="slots-info">
              <label>All Services</label>
              <span className="date-display">{selectedDateStr}</span>
            </div>
          </div>

          <div className="slots-table-container">
            <table className="slots-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Service</th>
                  <th>Capacity</th>
                  <th>Booked</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map(slot => (
                  <tr key={slot.id}>
                    <td>{slot.time}</td>
                    <td>{slot.service}</td>
                    <td>{slot.capacity}</td>
                    <td className="booked-cell">{slot.booked}/{slot.capacity}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-delete-slot"
                        onClick={() => handleDeleteSlot(slot.id)}
                        title="Delete Slot"
                      >
                        <FaTrash color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {slots.length === 0 && (
              <div className="empty-state">
                <p>No slots for this date. Click "Add Slots" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddSlotModal
          onClose={() => setIsModalOpen(false)}
          onAddSlot={handleAddSlot}
          selectedDate={selectedDate}
        />
      )}
    </div>
  )
}

export default ManageSlots
