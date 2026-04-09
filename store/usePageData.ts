import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import { create } from "zustand";

interface storeData {
  details: HOMEPAGE_DATA_PROPS | null;
  setDetails: (data: HOMEPAGE_DATA_PROPS) => void;
  clearDetails: () => void;
  insightsTab: number;
  setInsightsTab: (tab: number) => void;
  insightsPage: number;
  setInsightsPage: (page: number) => void;
}

export const usePageData = create<storeData>((set) => ({
  details: null,
  setDetails: (details) => set({ details }),
  clearDetails: () => set({ details: null }),
  insightsTab: 0,
  setInsightsTab: (insightsTab) => set({ insightsTab }),
  insightsPage: 1,
  setInsightsPage: (insightsPage) => set({ insightsPage }),
}));
