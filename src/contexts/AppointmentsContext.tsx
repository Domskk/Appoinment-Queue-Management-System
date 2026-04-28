import { createContext, useContext, useState, ReactNode } from 'react'

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Serving' | 'Completed'

export interface Appointment {
  id: number
  queueNumber: number
  userName: string
  userEmail: string
  service: string
  date: string
  time: string
  status: AppointmentStatus
}

interface AppointmentsContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void
  updateStatus: (id: number, status: AppointmentStatus) => void
  confirmAppointment: (id: number) => void
  startAppointment: (id: number) => void
  completeAppointment: (id: number) => void
  deleteAppointment: (id: number) => void
  filterByStatus: (status: AppointmentStatus | 'All') => Appointment[]
  searchAppointments: (query: string) => Appointment[]
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined)

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now(),
      status: 'Pending'
    }
    setAppointments(prev => [newAppointment, ...prev])
  }

  const updateStatus = (id: number, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status } : app)
    )
  }

  const confirmAppointment = (id: number) => {
    updateStatus(id, 'Confirmed')
  }

  const startAppointment = (id: number) => {
    updateStatus(id, 'Serving')
  }

  const completeAppointment = (id: number) => {
    updateStatus(id, 'Completed')
  }

  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(app => app.id !== id))
  }

  const filterByStatus = (status: AppointmentStatus | 'All') => {
    if (status === 'All') return appointments
    return appointments.filter(app => app.status === status)
  }

  const searchAppointments = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return appointments.filter(app =>
      app.userName.toLowerCase().includes(lowerQuery) ||
      app.userEmail.toLowerCase().includes(lowerQuery) ||
      app.queueNumber.toString().includes(lowerQuery) ||
      app.service.toLowerCase().includes(lowerQuery)
    )
  }

  return (
    <AppointmentsContext.Provider value={{
      appointments,
      addAppointment,
      updateStatus,
      confirmAppointment,
      startAppointment,
      completeAppointment,
      deleteAppointment,
      filterByStatus,
      searchAppointments
    }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider')
  }
  return context
}
