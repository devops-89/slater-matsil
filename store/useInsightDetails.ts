import { INSIGHTS_DETAIL_PROPS } from "@/utils/types";
import { create } from "zustand";

interface INSIGHT_DETAILS_STORE {
  data: INSIGHTS_DETAIL_PROPS | null;
  setInsightDetailsData: (data: INSIGHTS_DETAIL_PROPS) => void;
  clearInsightDetailsData: () => void;
}

export const useInsightDetails = create<INSIGHT_DETAILS_STORE>((set) => ({
  data: null,
  setInsightDetailsData: (data) => set({ data }),
  clearInsightDetailsData: () => set({ data: null }),
}));
