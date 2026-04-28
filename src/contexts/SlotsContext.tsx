import { createContext, useContext, useState, ReactNode } from 'react';

export interface TimeSlot {
  id: number;
  serviceId: number;
  serviceName: string;
  date: string;
  time: string;
  capacity: number;
  booked: number;
}

interface SlotsContextType {
  slots: TimeSlot[];
  addSlot: (slot: Omit<TimeSlot, 'id' | 'booked'>) => void;
  updateSlot: (slot: TimeSlot) => void;
  deleteSlot: (id: number) => void;
  getSlotsByService: (serviceId: number) => TimeSlot[];
  getAvailableSlots: (serviceId: number) => TimeSlot[];
  bookSlot: (slotId: number) => boolean;
  getSlotsForDate: (serviceId: number, date: string) => TimeSlot[];
}

const SlotsContext = createContext<SlotsContextType | undefined>(undefined);

export function SlotsProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  const addSlot = (newSlot: Omit<TimeSlot, 'id' | 'booked'>) => {
    const slot: TimeSlot = {
      ...newSlot,
      id: slots.length > 0 ? Math.max(...slots.map(s => s.id)) + 1 : 1,
      booked: 0,
    };
    setSlots([...slots, slot]);
  };

  const updateSlot = (updatedSlot: TimeSlot) => {
    setSlots(slots.map(s => (s.id === updatedSlot.id ? updatedSlot : s)));
  };

  const deleteSlot = (id: number) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const getSlotsByService = (serviceId: number) => {
    return slots.filter(s => s.serviceId === serviceId);
  };

  const getAvailableSlots = (serviceId: number) => {
    return slots.filter(s => s.serviceId === serviceId && s.booked < s.capacity);
  };

  const bookSlot = (slotId: number): boolean => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot || slot.booked >= slot.capacity) {
      return false;
    }
    setSlots(slots.map(s => (s.id === slotId ? { ...s, booked: s.booked + 1 } : s)));
    return true;
  };

  const getSlotsForDate = (serviceId: number, date: string) => {
    return slots.filter(s => s.serviceId === serviceId && s.date === date);
  };

  return (
    <SlotsContext.Provider
      value={{
        slots,
        addSlot,
        updateSlot,
        deleteSlot,
        getSlotsByService,
        getAvailableSlots,
        bookSlot,
        getSlotsForDate,
      }}
    >
      {children}
    </SlotsContext.Provider>
  );
}

export function useSlots() {
  const context = useContext(SlotsContext);
  if (context === undefined) {
    throw new Error('useSlots must be used within a SlotsProvider');
  }
  return context;
}
