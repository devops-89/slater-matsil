import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import { create } from "zustand";
import { WEBSITE_DATA } from "@/public/data/website-data";

interface storeData {
  details: HOMEPAGE_DATA_PROPS | null;
  setDetails: (data: HOMEPAGE_DATA_PROPS) => void;
  clearDetails: () => void;
}

export const usePageData = create<storeData>((set) => ({
  details: WEBSITE_DATA,
  setDetails: (details) => set({ details }),
  clearDetails: () => set({ details: null }),
}));
