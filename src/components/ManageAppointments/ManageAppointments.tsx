import { useState, useEffect } from 'react'
import { FiSearch, FiRefreshCw, FiCheckCircle, FiPlayCircle, FiTrash2, FiArchive } from 'react-icons/fi'
import { useAppointments, Appointment, AppointmentStatus } from '../../contexts/AppointmentsContext'
import './ManageAppointments.css'

function ManageAppointments() {
  const {
    appointments, archivedAppointments, loading,
    fetchAdminAppointments, fetchArchivedAppointments,
    confirmAppointment, startAppointment, completeAppointment,
    deleteAppointment, filterByStatus,
  } = useAppointments()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All')
  const [tab, setTab] = useState<'active' | 'archived'>('active')

  useEffect(() => {
    fetchAdminAppointments()
    fetchArchivedAppointments()
  }, [])

  const handleRefresh = () => {
    setSearchQuery('')
    setStatusFilter('All')
    fetchAdminAppointments()
    fetchArchivedAppointments()
  }

  const filteredActive = () => {
    let result = statusFilter !== 'All' ? filterByStatus(statusFilter) : appointments
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(a =>
        a.userName.toLowerCase().includes(q) ||
        a.queueNumber.toString().includes(q) ||
        a.service.toLowerCase().includes(q)
      )
    }
    return result
  }

  const filteredArchived = () => {
    if (!searchQuery) return archivedAppointments
    const q = searchQuery.toLowerCase()
    return archivedAppointments.filter(a =>
      a.userName.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q)
    )
  }

  const getStatusBadgeClass = (status: AppointmentStatus) => {
    const map = { Pending: 'pending', Confirmed: 'confirmed', Serving: 'serving', Completed: 'completed' }
    return `status-badge ${map[status] || ''}`
  }

  const getActionButtons = (appointment: Appointment) => {
    const buttons = []

    switch (appointment.status) {
      case 'Pending':
        buttons.push(
          <button key="confirm" className="action-btn confirm" onClick={() => confirmAppointment(appointment.id)}>
            <FiCheckCircle className="action-icon" /> Confirm
          </button>
        )
        break
      case 'Confirmed':
        buttons.push(
          <button key="start" className="action-btn start" onClick={() => startAppointment(appointment.id)}>
            <FiPlayCircle className="action-icon" /> Start
          </button>
        )
        break
      case 'Serving':
        buttons.push(
          <button key="complete" className="action-btn complete" onClick={() => completeAppointment(appointment.id)}>
            <FiCheckCircle className="action-icon" /> Complete
          </button>
        )
        break
    }

    // Delete (archive) button — always available on active appointments
    buttons.push(
      <button
        key="delete"
        className="action-btn delete"
        title="Archive appointment"
        onClick={() => {
          if (window.confirm(`Archive appointment #${appointment.queueNumber}?`)) {
            deleteAppointment(appointment.id)
          }
        }}
      >
        <FiTrash2 className="action-icon" />
      </button>
    )

    return <div className="actions-cell">{buttons}</div>
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading appointments...</div>

  return (
    <div className="manage-appointments">
      {/* Tabs */}
      <div className="appointments-tabs">
        <button
          className={`tab-btn ${tab === 'active' ? 'active' : ''}`}
          onClick={() => setTab('active')}
        >
          Active
        </button>
        <button
          className={`tab-btn ${tab === 'archived' ? 'active' : ''}`}
          onClick={() => setTab('archived')}
        >
          <FiArchive style={{ marginRight: 4 }} />
          Archived ({archivedAppointments.length})
        </button>
      </div>

      {/* Controls */}
      <div className="appointments-controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, queue # or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {tab === 'active' && (
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
        )}
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCw className="refresh-icon" /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Queue #</th>
              <th>User</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              {tab === 'active' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {(tab === 'active' ? filteredActive() : filteredArchived()).map(appointment => (
              <tr key={appointment.id}>
                <td><span className="queue-number">{appointment.queueNumber}</span></td>
                <td><div className="user-name">{appointment.userName}</div></td>
                <td>{appointment.service}</td>
                <td>
                  <div className="datetime">
                    <div>{appointment.date}</div>
                    <div className="time">{appointment.time}</div>
                  </div>
                </td>
                <td>
                  <span className={getStatusBadgeClass(appointment.status)}>
                    <span className={`status-dot ${appointment.status.toLowerCase()}-dot`}></span>
                    {appointment.status}
                  </span>
                </td>
                {tab === 'active' && <td>{getActionButtons(appointment)}</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {(tab === 'active' ? filteredActive() : filteredArchived()).length === 0 && (
          <div className="empty-state">
            <p>{tab === 'active' ? 'No active appointments found.' : 'No archived appointments.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageAppointments