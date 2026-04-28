import { createContext, useContext, useState, ReactNode } from 'react';

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
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  toggleServiceStatus: (id: number) => void;
  getActiveServices: () => Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  const addService = (newService: Omit<Service, 'id'>) => {
    const service: Service = {
      ...newService,
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
    };
    setServices([...services, service]);
  };

  const updateService = (updatedService: Service) => {
    setServices(services.map(s => (s.id === updatedService.id ? updatedService : s)));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const toggleServiceStatus = (id: number) => {
    setServices(
      services.map(s =>
        s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
      )
    );
  };

  const getActiveServices = () => {
    return services.filter(s => s.status === 'Active');
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        getActiveServices,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
}
