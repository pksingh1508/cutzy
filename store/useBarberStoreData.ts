import { create } from "zustand";

interface Barber {
  name: string;
  phone: string;
  isAvailable: Boolean;
  id: string;
  shop_id: string;
  bio: string;
  experience: number;
}

interface BarberStore {
  barbers: Barber[];
  setBarbers: (barbers: Barber[]) => void;
  clearBarbers: () => void;
}

const useBarberStoreData = create<BarberStore>((set) => ({
  barbers: [],

  setBarbers: (barbers) => {
    set({ barbers });
  },

  clearBarbers: () => {
    set({ barbers: [] });
  }
}));

export default useBarberStoreData;
export type { Barber };
