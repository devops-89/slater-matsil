import { userPublicApi, userSecuredApi } from "./config";

export const ProfessionalControllers = {
  createProfessionalProfile: async (data: any) => {
    try {
      const result = await userSecuredApi.post("professional-profile", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateProfessionalProfile: async (id: number, data: any) => {
    try {
      const result = await userSecuredApi.patch("professional-profile", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteProfessionalProfile: async (id: number) => {
    try {
      const result = await userSecuredApi.delete(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllProfessionalProfiles: async (limit: number = 100) => {
    try {
      const result = await userPublicApi.get(`all?role=PROFESSIONAL&limit=${limit}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getProfessionalById: async (id: number) => {
    try {
      const result = await userPublicApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
