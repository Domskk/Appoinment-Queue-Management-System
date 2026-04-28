import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ServicesProvider } from './contexts/ServicesContext'
import { SlotsProvider } from './contexts/SlotsContext'
import { AppointmentsProvider } from './contexts/AppointmentsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServicesProvider>
      <SlotsProvider>
        <AppointmentsProvider>
          <App />
        </AppointmentsProvider>
      </SlotsProvider>
    </ServicesProvider>
  </React.StrictMode>,
)
