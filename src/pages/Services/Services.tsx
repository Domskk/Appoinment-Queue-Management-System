import { useState } from 'react'
import './Services.css'
import ServicesList from '../../components/ServicesList/ServicesList'
import SelectTimeSlot from '../../components/SelectTimeSlot/SelectTimeSlot'
import ConfirmBooking from '../../components/ConfirmBooking/ConfirmBooking'
import BookingConfirmed from '../../components/BookingConfirmed/BookingConfirmed'

interface Service {
  id: number
  name: string
  duration: number
}

interface BookingData {
  service: Service | null
  date: string
  time: string
}

function Services() {
  const [step, setStep] = useState<'list' | 'time' | 'confirm' | 'confirmed'>('list')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: '',
    time: ''
  })
  const [queueNumber, setQueueNumber] = useState(0)

  const services: Service[] = [
    { id: 1, name: 'General Consultation', duration: 30 },
    { id: 2, name: 'Dental Cleaning', duration: 45 },
    { id: 3, name: 'Eye Exam', duration: 20 },
  ]

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
        <ServicesList services={services} onSelectService={handleSelectService} />
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
