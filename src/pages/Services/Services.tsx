import { useState } from 'react'
import './Services.css'
import ServicesList from '../../components/ServicesList/ServicesList'
import SelectTimeSlot from '../../components/SelectTimeSlot/SelectTimeSlot'
import ConfirmBooking from '../../components/ConfirmBooking/ConfirmBooking'
import BookingConfirmed from '../../components/BookingConfirmed/BookingConfirmed'
import { useServices } from '../../contexts/ServicesContext'
import { Service } from '../../contexts/ServicesContext'
import { useAppointments } from '../../contexts/AppointmentsContext'

function getStoredUser() {
  const stored = localStorage.getItem('aqms_user')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (_) {
      return null
    }
  }
  return null
}

interface BookingData {
  service: Service | null
  date: string
  time: string
}

function Services() {
  const { getActiveServices } = useServices()
  const { addAppointment } = useAppointments()
  const [step, setStep] = useState<'list' | 'time' | 'confirm' | 'confirmed'>('list')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: '',
    time: ''
  })
  const [queueNumber, setQueueNumber] = useState(0)
  const activeServices = getActiveServices()

  const handleSelectService = (service: Service) => {
    setBookingData({ ...bookingData, service })
    setStep('time')
  }

  const handleSelectTime = (date: string, time: string) => {
    setBookingData({ ...bookingData, date, time })
    setStep('confirm')
  }

  const handleConfirmBooking = () => {
    // Generate a random queue number (1-100) for now
    const queue = Math.floor(Math.random() * 100) + 1
    setQueueNumber(queue)

    // Add appointment to global context (for admin to see)
    if (bookingData.service && bookingData.date && bookingData.time) {
      // Format date like "Mar 9" for display
      const [year, month, day] = bookingData.date.split('-')
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      const user = getStoredUser()
      addAppointment({
        queueNumber: queue,
        userName: user?.fullName || 'Current User',
        userEmail: user?.email || 'user@example.com',
        service: bookingData.service.name,
        date: formattedDate,
        time: bookingData.time
      })
    }

    setStep('confirmed')
  }

  const handleGoToDashboard = () => {
    setStep('list')
    setBookingData({ service: null, date: '', time: '' })
    setQueueNumber(0)
  }

  const handleTrackQueue = () => {
    setStep('list')
    setBookingData({ service: null, date: '', time: '' })
    setQueueNumber(0)
  }

  const handleGoBack = () => {
    if (step === 'time') {
      setStep('list')
    } else if (step === 'confirm') {
      setStep('time')
    } else if (step === 'confirmed') {
      handleGoToDashboard()
    }
  }

  return (
    <div className="services-page">
      {step === 'list' && (
        <ServicesList services={activeServices} onSelectService={handleSelectService} />
      )}
      {step === 'time' && bookingData.service && (
        <SelectTimeSlot
          service={bookingData.service}
          onSelectTime={handleSelectTime}
          onGoBack={handleGoBack}
        />
      )}
      {step === 'confirm' && bookingData.service && (
        <ConfirmBooking
          bookingData={bookingData}
          onConfirm={handleConfirmBooking}
          onGoBack={handleGoBack}
        />
      )}
      {step === 'confirmed' && bookingData.service && (
        <BookingConfirmed
          bookingData={bookingData}
          queueNumber={queueNumber}
          onGoToDashboard={handleGoToDashboard}
          onTrackQueue={handleTrackQueue}
        />
      )}
    </div>
  )
}

export default Services
