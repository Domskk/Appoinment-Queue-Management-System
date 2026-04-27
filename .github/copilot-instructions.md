# AQMS - Appointment Queue Management System

A React frontend-only application for managing appointment queues and scheduling.

## Project Information

**Type**: React Frontend Application  
**Framework**: React 18.2 with TypeScript  
**Build Tool**: Vite  
**Routing**: React Router v6  
**Styling**: CSS3  
**State Management**: React Hooks

## Development Workflow

### Required Commands

**Start Development Server**:
```bash
npm run dev
```
Launches the dev server at http://localhost:3000

**Build for Production**:
```bash
npm run build
```
Creates optimized build in `dist/` folder

## Key Features

- Landing page with branding and navigation
- User login system (frontend-only)
- Dashboard with appointment overview
- Real-time queue tracking
- Appointment management interface
- Navigation sidebar
- Responsive design for mobile and desktop

## Project Structure

- `src/pages/` - Page components (Landing, Login, Dashboard)
- `src/components/` - Reusable components (Sidebar, AppointmentOverview, etc.)
- `src/index.css` - Global styles
- `src/App.tsx` - Main routing component
- `index.html` - HTML entry point

## Code Guidelines

- Use TypeScript for type safety
- Use functional components with hooks
- Component styling: individual CSS files per component
- Props should be typed with interfaces
- Use React Router for navigation
- Keep components focused and reusable

## Current Status

✅ Project scaffolding complete  
✅ All components created  
✅ Routing implemented  
✅ Styling complete  
✅ Ready for development server launch

## Next Steps for Backend Integration

1. Replace hardcoded appointment data with API calls
2. Implement actual authentication with backend
3. Add API service layer for queue management
4. Implement real-time updates with WebSockets
5. Add persistent storage with database integration
