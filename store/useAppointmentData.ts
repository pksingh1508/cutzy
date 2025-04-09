import { create } from "zustand";

interface Appointment {
  barber_id: string | null;
  barber_name: string | null;
  endtime: string;
  id: string;
  service_id: string | null;
  service_name: string | null;
  starttime: string;
  status: string;
  user_id: string | null;
  user_name: string | null;
  shops_id: string | null;
}

interface AppointmentStore {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  clearAppointments: () => void;
}

const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],

  setAppointments: (appointments) => {
    set({ appointments });
  },

  clearAppointments: () => {
    set({ appointments: [] });
  }
}));

export default useAppointmentStore;
