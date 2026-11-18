# AQMS - Appointment Queue Management System

A modern React-based frontend application for managing appointment queues and scheduling.

## Features

- **Landing Page**: Welcome screen with navigation
- **User Authentication**: Login functionality with email and password
- **Dashboard**: Main user interface with appointment overview
- **Queue Management**: Real-time queue position and status tracking
- **Appointment Scheduling**: View and manage upcoming appointments
- **Service Navigation**: Browse and select services
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── pages/
│   ├── Landing/        # Landing page
│   ├── Login/          # Login page
│   └── Dashboard/      # Main dashboard page
├── components/
│   ├── Sidebar/        # Navigation sidebar
│   ├── DashboardContent/   # Dashboard main content
│   ├── AppointmentOverview/# Appointment statistics
│   ├── CurrentQueue/   # Current queue info
│   └── UpcomingAppointments/ # Appointment list
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Tech Stack

- **React 18.2** - UI library
- **TypeScript** - Type safety
- **React Router 6** - Client-side routing
- **Vite** - Build tool
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` folder.

## Usage

1. **Landing Page**: Click the "Login" button to navigate to the login page
2. **Login**: Enter any email and password to access the dashboard (frontend-only validation)
3. **Dashboard**: 
   - View appointment overview statistics
   - Check current queue status
   - See upcoming appointments
   - Navigate between Dashboard, Services, and My Queue sections

## Features Overview

### Dashboard
- Shows upcoming appointments count
- Displays completed appointments count
- Shows current queue position

### Current Queue
Shows:
- Queue progress visualization
- Current service being served
- Your appointment status

### Upcoming Appointments
Lists upcoming appointments with:
- Service name
- Date and time
- Appointment status (Confirmed, Serving, Pending)

## Backend Integration

The frontend connects to the PHP API at `http://localhost/appointmentmanagement/api` by default. Update `src/api/config.ts` if the backend is hosted elsewhere.

API responses are mapped to typed, allowlisted fields in `src/api/routes.ts`; raw response objects and server error messages are not returned to UI components. Public registration creates regular user accounts only. Admin accounts must be provisioned through a trusted process.

Some dashboard and reporting views still use local state and may need further integration with their corresponding API endpoints.

## Future Enhancements

- Real-time queue updates with WebSockets
- Email notifications
- Calendar integration
- Appointment rescheduling

## License

MIT
