import { useMemo, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import { FiBarChart2, FiCheckCircle, FiPercent, FiUsers } from 'react-icons/fi'
import { useAppointments } from '../../contexts/AppointmentsContext'
import './ManageReports.css'

function ManageReports() {
  const { appointments, fetchAdminAppointments } = useAppointments()

  useEffect(() => { fetchAdminAppointments() }, [])

  const stats = useMemo(() => {
    const total = appointments.length
    const completed = appointments.filter(a => a.status === 'Completed').length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    const avgQueue = total > 0
      ? Math.round(appointments.reduce((sum, a) => sum + a.queueNumber, 0) / total)
      : 0
    return { total, completed, completionRate, avgQueue }
  }, [appointments])

  const serviceDemandData = useMemo(() => {
    const counts: Record<string, number> = {}
    appointments.forEach(a => { counts[a.service] = (counts[a.service] || 0) + 1 })
    return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  }, [appointments])

  const statusData = useMemo(() => {
    const counts: Record<string, number> = { Pending: 0, Confirmed: 0, Serving: 0, Completed: 0 }
    appointments.forEach(a => { counts[a.status]++ })
    return [
      { name: 'Pending', value: counts.Pending, color: '#DAA520' },
      { name: 'Confirmed', value: counts.Confirmed, color: '#3f8f95' },
      { name: 'Serving', value: counts.Serving, color: '#27AE60' },
      { name: 'Completed', value: counts.Completed, color: '#888888' }
    ].filter(d => d.value > 0)
  }, [appointments])

  const peakHoursData = useMemo(() => {
    const counts: Record<string, number> = {}
    appointments.forEach(a => { counts[a.time] = (counts[a.time] || 0) + 1 })
    return Object.entries(counts).map(([time, count]) => ({ time, count })).sort((a, b) => a.time.localeCompare(b.time))
  }, [appointments])

  const waitTimeData = useMemo(() => {
    const dateWaits: Record<string, { total: number; count: number }> = {}
    appointments.forEach(a => {
      if (!dateWaits[a.date]) dateWaits[a.date] = { total: 0, count: 0 }
      dateWaits[a.date].total += a.queueNumber * 5
      dateWaits[a.date].count++
    })
    return Object.entries(dateWaits)
      .map(([date, data]) => ({ date, waitTime: Math.round(data.total / data.count) }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14)
  }, [appointments])

  const hasData = appointments.length > 0

  return (
    <div className="manage-reports">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header"><span>Total Appointments</span><FiBarChart2 className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Completed</span><FiCheckCircle className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{stats.completed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Completion Rate</span><FiPercent className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{stats.completionRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span>Avg Queue Position</span><FiUsers className="stat-icon" style={{ color: '#2f6f73' }}/></div>
          <div className="stat-value">{stats.avgQueue}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container wide">
          <div className="chart-header"><div><h3>Wait Time Report</h3><p>Average estimated wait time per day</p></div></div>
          <div className="chart-content">
            {hasData && waitTimeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={waitTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: 'min', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} min`, 'Avg Wait']} />
                  <Line type="monotone" dataKey="waitTime" stroke="#3f8f95" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : <div className="no-data">No wait time data available</div>}
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header"><div><h3>Service Demand</h3><p>Bookings per service</p></div></div>
          <div className="chart-content">
            {hasData && serviceDemandData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={serviceDemandData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3f8f95" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="no-data">No service data available</div>}
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header"><div><h3>Status Breakdown</h3><p>Distribution by status</p></div></div>
          <div className="chart-content">
            {hasData && statusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="legend">
                  {statusData.map(item => (
                    <div key={item.name} className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                      <span className="legend-label">{item.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <div className="no-data">No status data available</div>}
          </div>
        </div>

        <div className="chart-container wide">
          <div className="chart-header"><div><h3>Peak Hours Distribution</h3><p>Total appointments per time slot</p></div></div>
          <div className="chart-content">
            {hasData && peakHoursData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1ABC9C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="no-data">No peak hours data available</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageReports