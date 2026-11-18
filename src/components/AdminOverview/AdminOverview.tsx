import { useEffect } from 'react'
import './AdminOverview.css'
import { MdEvent, MdEventAvailable } from "react-icons/md"
import { FaCheck, FaUsers } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { useAppointments } from '../../contexts/AppointmentsContext'
import { useServices } from '../../contexts/ServicesContext'
import { useSlots } from '../../contexts/SlotsContext'

function AdminOverview() {
  const { appointments, fetchAdminAppointments } = useAppointments()
  const { services } = useServices()
  const { slots, fetchSlots } = useSlots()

  useEffect(() => {
    fetchAdminAppointments()
    fetchSlots()
  }, [])

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(a => a.date === today).length
  const activeServices = services.filter(s => s.status === 'Active').length
  const availableSlots = slots.filter(s => s.booked < s.capacity).length

  // Build last 7 days chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' })
    const count = appointments.filter(a => a.date === dateStr).length
    return { day: dayLabel, value: count }
  })

  // Popular services
  const serviceCounts: Record<string, number> = {}
  appointments.forEach(a => { serviceCounts[a.service] = (serviceCounts[a.service] || 0) + 1 })
  const popularServices = Object.entries(serviceCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header"><span>Today's Appointments</span><MdEvent className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{todayAppointments}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Active Services</span><FaCheck className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{activeServices}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Total Appointments</span><FaUsers className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{appointments.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Available Slots</span><MdEventAvailable className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{availableSlots}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Appointments This Week</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={last7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3f8f95" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Popular Services</h3>
          <div className="chart-wrapper">
            {popularServices.length === 0 ? (
              <div className="no-data-message">No services data available</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={popularServices} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1ABC9C" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview