import { createContext, useContext, useState, ReactNode } from 'react'
import {
  getAppointmentsByUser,
  getAdminAppointments,
  updateAppointmentStatus,
  deleteAppointment as apiDeleteAppointment,
  getArchivedAppointments as apiGetArchived,
  AppointmentData,
} from '../api/routes'

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Serving' | 'Completed'

export interface Appointment {
  id: number
  queueNumber: number
  userName: string
  userEmail: string
  service: string
  date: string
  time: string
  estimatedEnd?: string
  status: AppointmentStatus
}

interface AppointmentsContextType {
  appointments: Appointment[]
  archivedAppointments: Appointment[]
  loading: boolean
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void
  updateStatus: (id: number, status: AppointmentStatus) => void
  confirmAppointment: (id: number) => void
  startAppointment: (id: number) => void
  completeAppointment: (id: number) => void
  deleteAppointment: (id: number) => void
  filterByStatus: (status: AppointmentStatus | 'All') => Appointment[]
  searchAppointments: (query: string) => Appointment[]
  fetchUserAppointments: (userId: string) => void
  fetchAdminAppointments: () => void
  fetchArchivedAppointments: () => void
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined)

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [archivedAppointments, setArchivedAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUserAppointments = async (userId: string) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token') || ''
      const res = await getAppointmentsByUser(userId, token)
      if (res.success) {
        const mapped = res.data.map((a: AppointmentData) => ({
          id: a.id,
          queueNumber: a.queue_number,
          userName: a.user_name || '',
          userEmail: '',
          service: a.service_name,
          date: a.appointment_date,
          time: a.appointment_time,
          estimatedEnd: a.estimated_end || undefined,
          status: capitalize(a.status) as AppointmentStatus,
        }))
        setAppointments(mapped)
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAdminAppointments = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token') || ''
      const res = await getAdminAppointments(token)
      if (res.success) {
        const mapped = res.data.map((a: AppointmentData) => ({
          id: a.id,
          queueNumber: a.queue_number,
          userName: a.user_name || '',
          userEmail: '',
          service: a.service_name,
          date: a.appointment_date,
          time: a.appointment_time,
          status: capitalize(a.status) as AppointmentStatus,
        }))
        setAppointments(mapped)
      }
    } catch (err) {
      console.error('Failed to fetch admin appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchArchivedAppointments = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token') || ''
      const res = await apiGetArchived(token)
      if (res.success) {
        const mapped = res.data.map((a: AppointmentData) => ({
          id: a.id,
          queueNumber: a.queue_number,
          userName: a.user_name || '',
          userEmail: '',
          service: a.service_name,
          date: a.appointment_date,
          time: a.appointment_time,
          status: capitalize(a.status) as AppointmentStatus,
        }))
        setArchivedAppointments(mapped)
      }
    } catch (err) {
      console.error('Failed to fetch archived appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    setAppointments(prev => [{ ...appointment, id: Date.now(), status: 'Pending' }, ...prev])
  }

  const updateStatus = async (id: number, status: AppointmentStatus) => {
    try {
      const token = localStorage.getItem('token') || ''
      const res = await updateAppointmentStatus(id, status.toLowerCase(), token)
      if (res.success) {
        setAppointments(prev =>
          prev.map(app => app.id === id ? { ...app, status } : app)
        )
      } else {
        console.error('Status update failed:', res.message)
      }
    } catch (err) {
      console.error('Cannot connect to server:', err)
    }
  }

  // Soft delete — removes from active list, moves to archived
  const deleteAppointment = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || ''
      const res = await apiDeleteAppointment(id, token)
      if (res.success) {
        const deleted = appointments.find(a => a.id === id)
        if (deleted) {
          setAppointments(prev => prev.filter(a => a.id !== id))
          setArchivedAppointments(prev => [deleted, ...prev])
        }
      } else {
        console.error('Delete failed:', res.message)
      }
    } catch (err) {
      console.error('Cannot connect to server:', err)
    }
  }

  const confirmAppointment  = (id: number) => updateStatus(id, 'Confirmed')
  const startAppointment    = (id: number) => updateStatus(id, 'Serving')
  const completeAppointment = (id: number) => updateStatus(id, 'Completed')

  const filterByStatus = (status: AppointmentStatus | 'All') =>
    status === 'All' ? appointments : appointments.filter(a => a.status === status)

  const searchAppointments = (query: string) => {
    const q = query.toLowerCase()
    return appointments.filter(a =>
      a.userName.toLowerCase().includes(q) ||
      a.queueNumber.toString().includes(q) ||
      a.service.toLowerCase().includes(q)
    )
  }

  return (
    <AppointmentsContext.Provider value={{
      appointments, archivedAppointments, loading,
      addAppointment, updateStatus,
      confirmAppointment, startAppointment,
      completeAppointment, deleteAppointment,
      filterByStatus, searchAppointments,
      fetchUserAppointments, fetchAdminAppointments,
      fetchArchivedAppointments,
    }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (!context) throw new Error('useAppointments must be used within an AppointmentsProvider')
  return context
}