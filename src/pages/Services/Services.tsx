import { useState } from 'react'
import './Services.css'
import ServicesList from '../../components/ServicesList/ServicesList'
import SelectTimeSlot from '../../components/SelectTimeSlot/SelectTimeSlot'
import ConfirmBooking from '../../components/ConfirmBooking/ConfirmBooking'
import BookingConfirmed from '../../components/BookingConfirmed/BookingConfirmed'
import { useServices, Service } from '../../contexts/ServicesContext'
import { createAppointment } from '../../api/routes'

interface BookingData {
  service: Service | null
  date: string
  time: string
  slotId: number | null
}

function Services() {
  const { getActiveServices, loading } = useServices()
  const [step, setStep] = useState<'list' | 'time' | 'confirm' | 'confirmed'>('list')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null, date: '', time: '', slotId: null
  })
  const [queueNumber, setQueueNumber] = useState(0)
  const [bookingError, setBookingError] = useState('')
  const [, setBookingLoading] = useState(false)

  const activeServices = getActiveServices()

  const handleSelectService = (service: Service) => {
    setBookingData({ service, date: '', time: '', slotId: null })
    setStep('time')
  }

  const handleSelectTime = (date: string, time: string, slotId: number) => {
    setBookingData(prev => ({ ...prev, date, time, slotId }))
    setStep('confirm')
  }

  const handleConfirmBooking = async () => {
     console.log('Booking data:', {
    service_id: bookingData.service?.id,
    slot_id: bookingData.slotId,
    appointment_date: bookingData.date,
    appointment_time: bookingData.time,
  })
    if (!bookingData.service || !bookingData.date || !bookingData.time) return

    setBookingLoading(true)
    setBookingError('')

    try {
      const token = localStorage.getItem('token') || ''
      const appointmentPayload: any = {
        service_id: bookingData.service.id,
        appointment_date: bookingData.date,
        appointment_time: bookingData.time,
        notes: ''
      }

      if (bookingData.slotId != null) {
        appointmentPayload.slot_id = bookingData.slotId
      }

      const res = await createAppointment(appointmentPayload, token)

      if (res.success) {
        setQueueNumber(res.data.queue_number)
        setStep('confirmed')
      } else {
        setBookingError(res.message || 'Booking failed')
      }
    } catch (err) {
      setBookingError('Cannot connect to server')
    } finally {
      setBookingLoading(false)
    }
  }

  const handleReset = () => {
    setStep('list')
    setBookingData({ service: null, date: '', time: '', slotId: null })
    setQueueNumber(0)
    setBookingError('')
  }

  const handleGoBack = () => {
    if (step === 'time') setStep('list')
    else if (step === 'confirm') setStep('time')
    else if (step === 'confirmed') handleReset()
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading services...</div>

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
        <>
          {bookingError && <p style={{ color: 'red', padding: '1rem' }}>{bookingError}</p>}
          <ConfirmBooking
            bookingData={bookingData}
            onConfirm={handleConfirmBooking}
            onGoBack={handleGoBack}
          />
        </>
      )}
      {step === 'confirmed' && bookingData.service && (
        <BookingConfirmed
          bookingData={bookingData}
          queueNumber={queueNumber}
          onGoToDashboard={handleReset}
          onTrackQueue={handleReset}
        />
      )}
    </div>
  )
}

export default Services