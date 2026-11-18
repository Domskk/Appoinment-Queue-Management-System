import { useEffect } from 'react'
import AppointmentOverview from '../AppointmentOverview/AppointmentOverview'
import UpcomingAppointments from '../UpcomingAppointments/UpcomingAppointments'
import Services from '../../pages/Services/Services'
import MyQueue from '../../pages/MyQueue/MyQueue'
import Profile from '../../pages/Profile/Profile'
import { useAppointments } from '../../contexts/AppointmentsContext'
import './DashboardContent.css'

interface DashboardContentProps {
  activePage: string
  onLogout: () => void
  userFullName: string
  onNavigateToServices: () => void
}

function DashboardContent({ activePage, onLogout, userFullName, onNavigateToServices }: DashboardContentProps) {
  const { appointments, fetchUserAppointments } = useAppointments()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) fetchUserAppointments(String(user.id))
  }, [activePage]) 

  const upcomingCount = appointments.filter(a => a.status !== 'Completed').length
  const completedCount = appointments.filter(a => a.status === 'Completed').length
  const nextQueueNumber = appointments.find(a => a.status !== 'Completed')?.queueNumber ?? '-'

  return (
    <div className="dashboard-content">
      {activePage === 'dashboard' && (
        <>
          <header className="content-header">
            <div>
              <h1>Welcome back, {userFullName}</h1>
              <p>Here's your appointment overview</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="dashboard-main">
            <AppointmentOverview
              upcoming={upcomingCount}
              completed={completedCount}
              queuePosition={nextQueueNumber}
            />
            <UpcomingAppointments appointments={appointments} onBookNew={onNavigateToServices} />
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