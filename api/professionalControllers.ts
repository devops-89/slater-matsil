import { AxiosResponse } from "axios";
import { userPublicApi, userSecuredApi } from "./config";

export const ProfessionalControllers = {
  createProfessionalProfile: async (data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      const result = await userSecuredApi.post("professional-profile", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteProfessionalProfile: async (id: number): Promise<AxiosResponse> => {
    try {
      const result = await userSecuredApi.delete(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllProfessionalProfiles: async (limit: number = 100): Promise<AxiosResponse> => {
    try {
      const result = await userPublicApi.get(`all?role=PROFESSIONAL&limit=${limit}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getProfessionalById: async (id: number): Promise<AxiosResponse> => {
    try {
      const result = await userPublicApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  downloadProfessionalPdf: async (id: number | string): Promise<AxiosResponse> => {
    try {
      const result = await userPublicApi.get(`${id}/download-pdf`, { responseType: 'blob' });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
