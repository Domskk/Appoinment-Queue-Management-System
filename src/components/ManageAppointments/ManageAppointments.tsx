import { useState } from 'react'
import { FiSearch, FiRefreshCw, FiCheckCircle, FiPlayCircle } from 'react-icons/fi'
import { useAppointments, Appointment, AppointmentStatus } from '../../contexts/AppointmentsContext'
import './ManageAppointments.css'

function ManageAppointments() {
  const { appointments, confirmAppointment, startAppointment, completeAppointment, filterByStatus } = useAppointments()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleRefresh = () => {
    setSearchQuery('')
    setStatusFilter('All')
  }

  const filteredAppointments = () => {
    let result = appointments
    if (statusFilter !== 'All') {
      result = filterByStatus(statusFilter)
    }
    if (searchQuery) {
      result = result.filter(app =>
        app.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.queueNumber.toString().includes(searchQuery) ||
        app.service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return result
  }

  const getStatusBadgeClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'Pending':
        return 'status-badge pending'
      case 'Confirmed':
        return 'status-badge confirmed'
      case 'Serving':
        return 'status-badge serving'
      case 'Completed':
        return 'status-badge completed'
      default:
        return 'status-badge'
    }
  }

  const getActionButton = (appointment: Appointment) => {
    switch (appointment.status) {
      case 'Pending':
        return (
          <button className="action-btn confirm" onClick={() => confirmAppointment(appointment.id)}>
            <FiCheckCircle className="action-icon" />
            Confirm
          </button>
        )
      case 'Confirmed':
        return (
          <button className="action-btn start" onClick={() => startAppointment(appointment.id)}>
            <FiPlayCircle className="action-icon" />
            Start
          </button>
        )
      case 'Serving':
        return (
          <button className="action-btn complete" onClick={() => completeAppointment(appointment.id)}>
            <FiCheckCircle className="action-icon" />
            Complete
          </button>
        )
      case 'Completed':
        return <span className="no-action">-</span>
      default:
        return null
    }
  }

  return (
    <div className="manage-appointments">
      <div className="appointments-controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, or queue #..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'All')}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Serving">Serving</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCw className="refresh-icon" />
          Refresh
        </button>
      </div>

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Queue #</th>
              <th>User</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments().map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  <span className="queue-number">{appointment.queueNumber}</span>
                </td>
                <td>
                  <div className="user-info">
                    <div className="user-name">{appointment.userName}</div>
                    <div className="user-email">{appointment.userEmail}</div>
                  </div>
                </td>
                <td>{appointment.service}</td>
                <td>
                  <div className="datetime">
                    <div>{appointment.date}</div>
                    <div className="time">{appointment.time}</div>
                  </div>
                </td>
                <td>
                  <span className={getStatusBadgeClass(appointment.status)}>
                    {appointment.status === 'Pending' && <span className="status-dot pending-dot"></span>}
                    {appointment.status === 'Confirmed' && <span className="status-dot confirmed-dot"></span>}
                    {appointment.status === 'Serving' && <span className="status-dot serving-dot"></span>}
                    {appointment.status === 'Completed' && <span className="status-dot completed-dot"></span>}
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    {getActionButton(appointment)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments().length === 0 && (
          <div className="empty-state">
            <p>No appointments yet. Bookings from users will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageAppointments
