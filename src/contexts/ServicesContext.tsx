import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getServices, ServiceData, updateService as apiUpdateService } from '../api/routes';

export interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  icon?: string;
  status: 'Active' | 'Inactive';
}

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (service: Service) => Promise<boolean>;
  deleteService: (id: number) => void;
  toggleServiceStatus: (id: number) => void;
  getActiveServices: () => Service[];
  refreshServices: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getServices();
      if (res.success) {
        const mapped = res.data.map((s: ServiceData) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          duration: s.duration,
          status: s.is_active ? 'Active' as const : 'Inactive' as const,
        }));
        setServices(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const addService = (newService: Omit<Service, 'id'>) => {
    const service: Service = {
      ...newService,
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
    };
    setServices([...services, service]);
  };

  // ✅ Calls PUT /services via routes.ts, updates local state only on success
  const updateService = async (updatedService: Service): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token') || ''
      const res = await apiUpdateService({
        id:          updatedService.id,
        name:        updatedService.name,
        description: updatedService.description ?? '',
        duration:    updatedService.duration,
        is_active:   updatedService.status === 'Active' ? 1 : 0,
      }, token)

      if (res.success) {
        setServices(prev =>
          prev.map(s => s.id === updatedService.id ? updatedService : s)
        )
        return true
      } else {
        console.error('Update service failed:', res.message)
        return false
      }
    } catch (err) {
      console.error('Cannot connect to server:', err)
      return false
    }
  }

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ));
  };

  const getActiveServices = () => services.filter(s => s.status === 'Active');

  return (
    <ServicesContext.Provider value={{
      services, loading, addService, updateService,
      deleteService, toggleServiceStatus, getActiveServices,
      refreshServices: fetchServices,
    }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) throw new Error('useServices must be used within a ServicesProvider');
  return context;
}