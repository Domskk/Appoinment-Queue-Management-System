import './AdminDashboardContent.css'
import AdminOverview from '../AdminOverview/AdminOverview'
import ManageServices from '../ManageServices/ManageServices'
import ManageSlots from '../ManageSlots/ManageSlots'
import ManageAppointments from '../ManageAppointments/ManageAppointments'
import ManageReports from '../ManageReports/ManageReports'

interface AdminDashboardContentProps {
  activePage: string
  onLogout: () => void
}

function AdminDashboardContent({ activePage, onLogout }: AdminDashboardContentProps) {
  return (
    <div className="admin-content">
      {activePage === 'dashboard' && (
        <>
          <header className="admin-header">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Overview of your queue management system</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="admin-main">
            <AdminOverview />
          </main>
        </>
      )}

      {activePage === 'services' && (
        <>
          <header className="admin-header">
            <div>
              <h1>Manage Services</h1>
              <p>Create and manage your service offerings</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="admin-main">
            <ManageServices />
          </main>
        </>
      )}

      {activePage === 'slots' && (
        <>
          <header className="admin-header">
            <div>
              <h1>Manage Slots</h1>
              <p>Create and manage time slots for services</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="admin-main">
            <ManageSlots />
          </main>
        </>
      )}

      {activePage === 'appointments' && (
        <>
          <header className="admin-header">
            <div>
              <h1>Appointments</h1>
              <p>Monitor and manage all appointments</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="admin-main">
            <ManageAppointments />
          </main>
        </>
      )}

      {activePage === 'reports' && (
        <>
          <header className="admin-header">
            <div>
              <h1>Reports</h1>
              <p>Wait time analytics & service demand insights</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </header>
          <main className="admin-main">
            <ManageReports />
          </main>
        </>
      )}
    </div>
  )
}

export default AdminDashboardContent
