import { PROFESSIONAL_DETAILS_PROPS } from "@/utils/types";
import { create } from "zustand";

interface PROFESSIONAL_STORE_DATA {
  data: PROFESSIONAL_DETAILS_PROPS | null;
  setProfessionalDetailsData: (data: PROFESSIONAL_DETAILS_PROPS) => void;
  clearProfessionalDetailsData: () => void;
}

export const useProfessionalDetailsData = create<PROFESSIONAL_STORE_DATA>(
  (set) => ({
    data: null,
    setProfessionalDetailsData: (data) => set({ data }),
    clearProfessionalDetailsData: () => set({ data: null }),
  })
);
