import { create } from "zustand";

interface UserState {
  username: string;
  phone: string;
  id: string;
  isPro: boolean;
  setUserData: (data: {
    username: string;
    phone: string;
    id: string;
    isPro: boolean;
  }) => void;
  resetUserData: () => void;
  updateUsername: (username: string) => void;
  // Add more specific update functions as needed
}

export const useUserData = create<UserState>((set) => ({
  // Initial state
  username: "",
  phone: "",
  id: "",
  isPro: false,

  // Function to update all user data at once
  setUserData: (data) =>
    set({
      username: data.username,
      phone: data.phone,
      id: data.id,
      isPro: data.isPro
    }),

  resetUserData: () =>
    set({
      username: "",
      phone: "",
      id: "",
      isPro: false
    }),

  updateUsername: (username: string) => set({ username })
}));
