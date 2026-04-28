import './AdminOverview.css'
import { MdEvent } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const appointmentsData = [
  { day: 'Tue', value: 0 },
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 0 },
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 0 },
  { day: 'Sun', value: 0 },
  { day: 'Mon', value: 0 },
];

function AdminOverview() {
  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Today's Appointments</span>
            <MdEvent className="stat-icon" style={{ color: '#2f6f73' }}/>
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Active Services</span>
            <FaCheck className="stat-icon" style={{ color: '#2f6f73' }}/>
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Registered Users</span>
            <FaUsers className="stat-icon" style={{ color: '#2f6f73' }}/>
          </div>
          <div className="stat-value">0</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Available Slots</span>
            <MdEventAvailable className="stat-icon" style={{ color: '#2f6f73' }}/>
          </div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Appointments This Week</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={appointmentsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                />
                <Bar dataKey="value" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Popular Services</h3>
          <div className="chart-wrapper donut-chart-wrapper">
            <div className="no-data-message">No services data available</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview
