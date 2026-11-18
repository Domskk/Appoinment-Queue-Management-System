import { useState } from 'react'
import './MyQueue.css'
import QueueStatus from '../../components/QueueStatus/QueueStatus'
import PastAppointmentsDetail from '../../components/PastAppointmentsDetail/PastAppointmentsDetail'

interface QueueAppointment {
  id: number
  service: string
  date: string
  status: 'pending' | 'confirmed' | 'serving' | 'completed'
}

function MyQueue() {
  const [view, setView] = useState<'status' | 'pastDetail'>('status')
  const [selectedAppointment, setSelectedAppointment] = useState<QueueAppointment | null>(null)

  const handleViewPastAppointment = (appointment: QueueAppointment) => {
    setSelectedAppointment(appointment)
    setView('pastDetail')
  }

  const handleGoBack = () => {
    setView('status')
    setSelectedAppointment(null)
  }

  return (
    <div className="my-queue">
      {view === 'status' && (
        <QueueStatus onViewPastAppointment={handleViewPastAppointment} />
      )}
      {view === 'pastDetail' && selectedAppointment && (
        <PastAppointmentsDetail
          appointment={selectedAppointment}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  )
}

export default MyQueue