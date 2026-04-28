import { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AddSlotModal from '../AddSlotModal/AddSlotModal'
import './ManageSlots.css'
import { useServices } from '../../contexts/ServicesContext'
import { useSlots } from '../../contexts/SlotsContext'

function ManageSlots() {
  const { services } = useServices()
  const { slots, addSlot, deleteSlot } = useSlots()
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 9))
  const [selectedServiceId, setSelectedServiceId] = useState<number | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddSlot = (newSlot: { time: string; serviceName: string; capacity: number; serviceId: number; date: string }) => {
    addSlot(newSlot)
    setIsModalOpen(false)
  }

  const handleDeleteSlot = (id: number) => {
    deleteSlot(id)
  }

  const filteredSlots = selectedServiceId === 'all' 
    ? slots 
    : slots.filter(slot => slot.serviceId === selectedServiceId)

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
              <select 
                className="service-filter"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Services</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
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
                {filteredSlots.map(slot => (
                  <tr key={slot.id}>
                    <td>{slot.time}</td>
                    <td>{slot.serviceName}</td>
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
          services={services}
        />
      )}
    </div>
  )
}

export default ManageSlots
