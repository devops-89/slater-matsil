import { AxiosResponse } from "axios";
import { careersPublicApi, careersSecuredApi } from "./config";

export const CareerControllers = {
  // Create Career Application
  createCareer: async (data: Record<string, unknown> | FormData): Promise<AxiosResponse> => {
    try {
      const result = await careersPublicApi.post("careers/add", data, {
        baseURL: "/backend-api/",
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get all careers with pagination
  getAllCareers: async (params?: Record<string, string | number | boolean>): Promise<AxiosResponse> => {
    try {
      const result = await careersSecuredApi.get("careers/all", { baseURL: "/backend-api/", params });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get career by ID
  getCareerById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      const result = await careersSecuredApi.get(`careers/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Delete career
  deleteCareer: async (id: number | string): Promise<AxiosResponse> => {
    try {
      const result = await careersSecuredApi.delete(`careers/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
