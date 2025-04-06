import { create } from "zustand";

interface ShopState {
  shop_id: string | null;
  shop_name: string | null;
  setShopData: (shop_id: string, shop_name: string) => void;
}

const useShopData = create<ShopState>((set) => ({
  shop_id: null,
  shop_name: null,
  setShopData: (shop_id: string, shop_name: string) =>
    set({ shop_id, shop_name })
}));

export default useShopData;
