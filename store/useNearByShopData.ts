import { create } from "zustand";

interface NearByShop {
  shop_name: string;
  phone: string;
  location: JSON;
  isOpen: Boolean;
  id: string;
  geolocation: string;
}

interface NearByShopStore {
  nearbyShops: NearByShop[];
  setNearbyShops: (nearbyShops: NearByShop[]) => void;
  clearNearbyShops: () => void;
}

const useNearByShopStore = create<NearByShopStore>((set) => ({
  nearbyShops: [],

  setNearbyShops: (nearbyShops) => {
    set({ nearbyShops });
  },

  clearNearbyShops: () => {
    set({ nearbyShops: [] });
  }
}));

export default useNearByShopStore;
export type { NearByShop };
