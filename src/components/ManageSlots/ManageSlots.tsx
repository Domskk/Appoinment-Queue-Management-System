import { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa";
import AddSlotModal from '../AddSlotModal/AddSlotModal'
import './ManageSlots.css'
import { useServices } from '../../contexts/ServicesContext'
import { useSlots } from '../../contexts/SlotsContext'

function ManageSlots() {
  const { services } = useServices()
  const { slots, addSlot, deleteSlot, fetchSlots } = useSlots()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedServiceId, setSelectedServiceId] = useState<number | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => { fetchSlots() }, [])

  const handleAddSlot = (newSlot: { time: string; serviceName: string; capacity: number; serviceId: number; date: string }) => {
    addSlot({ ...newSlot, booked: 0 } as any)
    fetchSlots() // refresh from server after adding
    setIsModalOpen(false)
  }

  const filteredSlots = selectedServiceId === 'all'
    ? slots
    : slots.filter(slot => slot.serviceId === selectedServiceId)

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(selectedDate)
  const firstDay = getFirstDayOfMonth(selectedDate)
  const paddedDays = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const selectedDateStr = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="manage-slots">
      <div className="manage-slots-header">
        <h2>Manage Slots</h2>
        <button className="btn-add-slot" onClick={() => setIsModalOpen(true)}>+ Add Slots</button>
      </div>

      <div className="slots-container">
        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>‹</button>
            <h3>{monthName}</h3>
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>›</button>
          </div>
          <div className="calendar-grid">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="weekday">{d}</div>)}
            {paddedDays.map((day, idx) => (
              <div
                key={idx}
                className={`calendar-day ${!day ? 'empty' : ''} ${day === selectedDate.getDate() ? 'selected' : ''}`}
                onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >{day}</div>
            ))}
          </div>
        </div>

        <div className="slots-section">
          <div className="slots-header">
            <div className="slots-info">
              <select
                className="service-filter"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Services</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <span className="date-display">{selectedDateStr}</span>
            </div>
          </div>

          <div className="slots-table-container">
            <table className="slots-table">
              <thead>
                <tr>
                  <th>Date</th>
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
                    <td>{slot.date}</td>
                    <td>{slot.time}</td>
                    <td>{slot.serviceName}</td>
                    <td>{slot.capacity}</td>
                    <td className="booked-cell">{slot.booked}/{slot.capacity}</td>
                    <td className="actions-cell">
                      <button className="btn-delete-slot" onClick={() => deleteSlot(slot.id)} title="Delete Slot">
                        <FaTrash color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSlots.length === 0 && (
              <div className="empty-state">
                <p>No slots found. Click "Add Slots" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>

     {isModalOpen && (
        <AddSlotModal
          onClose={() => setIsModalOpen(false)}
          onAddSlot={handleAddSlot}
          onDone={() => fetchSlots()}       // ← auto-refresh after generation
          selectedDate={selectedDate}
          services={services}
        />
      )}
    </div>
  )
}

export default ManageSlots