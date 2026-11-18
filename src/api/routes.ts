import API_BASE from './config';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Authentication
export const login = async (credentials: LoginCredentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return res.json();
};

export const register = async (userData: RegisterData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

// User
export const getProfile = async (token: string) => {
  const res = await fetch(`${API_BASE}/users/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const updateProfile = async (data: { name?: string; phone?: string }, token: string) => {
  const res = await fetch(`${API_BASE}/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

// Appointments
export const getAppointmentsByUser = async (userId: string, token: string) => {
  const res = await fetch(`${API_BASE}/appointments/user/${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const createAppointment = async (data: object, token: string) => {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateAppointmentStatus = async (id: number, status: string, token: string) => {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id, status })
  });
  return res.json();
};

// Services
export const getServices = async () => {
  const res = await fetch(`${API_BASE}/services`);
  return res.json();
};

export const createService = async (data: { name: string; description: string; duration: number }, token: string) => {
  const res = await fetch(`${API_BASE}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateService = async (
  data: { id: number; name: string; description: string; duration: number; is_active: number },
  token: string
) => {
  const res = await fetch(`${API_BASE}/services`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

// Admin
export const getAdminAppointments = async (token: string) => {
  const res = await fetch(`${API_BASE}/admin/appointments`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const createSlot = async (data: { service_id: number; slot_date: string; slot_time: string; capacity: number }, token: string) => {
  const res = await fetch(`${API_BASE}/slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getAdminSlots = async (token: string) => {
  const res = await fetch(`${API_BASE}/admin/slots`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

// Slots
export const getSlots = async () => {
  const res = await fetch(`${API_BASE}/slots`);
  return res.json();
};

export const deleteSlot = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/slots`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id })
  });
  return res.json();
};

// Appointments
export const deleteAppointment = async (id: number, token: string) => {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id })
  });
  return res.json();
};

export const getArchivedAppointments = async (token: string) => {
  const res = await fetch(`${API_BASE}/appointments/archived`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
// Reports
export const getWaitTimeReport = async (token: string, from?: string, to?: string) => {
  let url = `${API_BASE}/reports/wait-time`;
  
  // Add optional date filters
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  if (params.toString()) url += `?${params.toString()}`;
  
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const getServiceDemandReport = async (token: string, from?: string, to?: string) => {
  let url = `${API_BASE}/reports/service-demand`;
  
  // Add optional date filters
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  if (params.toString()) url += `?${params.toString()}`;
  
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};