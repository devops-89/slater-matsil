import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import { create } from "zustand";
import { WEBSITE_DATA } from "@/public/data/website-data";

interface storeData {
  details: HOMEPAGE_DATA_PROPS | null;
  setDetails: (data: HOMEPAGE_DATA_PROPS) => void;
  clearDetails: () => void;
  insightsTab: number;
  setInsightsTab: (tab: number) => void;
  insightsPage: number;
  setInsightsPage: (page: number) => void;
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
  activeSubmenu: string | null;
  setActiveSubmenu: (activeSubmenu: string | null) => void;
}

import { getUpdatedDetails } from "@/utils/storeUpdater";

const getInitialState = () => {
  if (typeof window !== 'undefined' && (window as any).__PAGE_TYPE__ && (window as any).__API_DATA__) {
    return getUpdatedDetails((window as any).__PAGE_TYPE__, (window as any).__API_DATA__);
  }
  return WEBSITE_DATA;
};

const usePageDataStore = create<storeData>((set) => ({
  details: getInitialState() as any,
  setDetails: (details) => set({ details }),
  clearDetails: () => set({ details: null }),
  insightsTab: 0,
  setInsightsTab: (insightsTab) => set({ insightsTab }),
  insightsPage: 1,
  setInsightsPage: (insightsPage) => set({ insightsPage }),
  navOpen: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  activeSubmenu: null,
  setActiveSubmenu: (activeSubmenu) => set({ activeSubmenu }),
}));

export const usePageData = Object.assign(
  <T,>(selector?: (state: storeData) => T): T | storeData => {
    if (typeof window === 'undefined') {
      const state = usePageDataStore.getState();
      return selector ? selector(state) : state;
    }
    return selector ? usePageDataStore(selector) : usePageDataStore();
  },
  usePageDataStore
) as typeof usePageDataStore;
