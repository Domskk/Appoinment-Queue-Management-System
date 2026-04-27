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

## Frontend-Only Implementation

This is a frontend-only prototype. Features currently implemented:
- Local state management using React hooks
- Client-side navigation with React Router
- Sample data hardcoded for demonstration

## Future Enhancements

- Backend API integration
- Real-time queue updates with WebSockets
- User authentication with JWT
- Database integration
- Email notifications
- Calendar integration
- Appointment rescheduling
- Admin dashboard
- Analytics and reporting

## License

MIT
