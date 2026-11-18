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
  const [bookingLoading, setBookingLoading] = useState(false)

  const activeServices = getActiveServices()

  interface BookingResult {
    queue_number: number
    appointment_date: string
    appointment_time: string
    estimated_end: string
  }

  const handleSelectService = (service: Service) => {
    setBookingData({ service, date: '', time: '', slotId: null })
    setStep('time')
  }

  const handleSelectTime = (date: string, time: string, slotId: number) => {
    setBookingData(prev => ({ ...prev, date, time, slotId }))
    setStep('confirm')
  }

  const handleConfirmBooking = async (): Promise<BookingResult | null> => {
    if (!bookingData.service || !bookingData.slotId) return null

    setBookingLoading(true)
    setBookingError('')

    try {
      const token = localStorage.getItem('token') || ''
      const res = await createAppointment({
        service_id: bookingData.service.id,
        slot_id: bookingData.slotId,
        notes: '',
      }, token)

      if (res.success) {
        setQueueNumber(res.data.queue_number)
        setStep('confirmed')
        return {
          queue_number: res.data.queue_number,
          appointment_date: res.data.appointment_date,
          appointment_time: res.data.appointment_time,
          estimated_end: res.data.estimated_end,
        }
      } else {
        setBookingError(res.message)
        return null
      }
    } catch (err) {
      setBookingError('Cannot connect to server')
      return null
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
            loading={bookingLoading}
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