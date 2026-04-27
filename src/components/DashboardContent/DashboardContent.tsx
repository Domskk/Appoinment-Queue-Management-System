import { useState } from 'react'
import AppointmentOverview from '../AppointmentOverview/AppointmentOverview'
import UpcomingAppointments from '../UpcomingAppointments/UpcomingAppointments'
import Services from '../../pages/Services/Services'
import MyQueue from '../../pages/MyQueue/MyQueue'
import Profile from '../../pages/Profile/Profile'
import './DashboardContent.css'

interface DashboardContentProps {
  activePage: string
  onLogout: () => void
}

function DashboardContent({ activePage, onLogout }: DashboardContentProps) {
  const [appointments] = useState<any[]>([])

  return (
    <div className="dashboard-content">
      {activePage === 'dashboard' && (
        <>
          <header className="content-header">
            <div>
              <h1>Welcome back, ............................</h1>
              <p>Here's your appointment overview</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="dashboard-main">
            <AppointmentOverview 
              upcoming={0}
              completed={0}
              queuePosition={'-'}
            />
            <UpcomingAppointments appointments={appointments} />
          </main>
        </>
      )}

      {activePage === 'services' && <Services />}

      {activePage === 'queue' && <MyQueue />}

      {activePage === 'profile' && <Profile />}
    </div>
  )
}

export default DashboardContent
