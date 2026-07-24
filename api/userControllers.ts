import { AxiosResponse } from "axios";
import { userSecuredApi } from "./config";

export const UserControllers = {
  createUser: async (data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.post("users-create", data, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id: number | string, data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.patch(`users/${id}`, data, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },


  getAllUsers: async (params?: Record<string, string | number | boolean>): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.get("users/all-with-roles", { baseURL: "/backend-api/", params });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.get(`users/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.delete(`users/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getDashboardCounts: async (): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.get("users/dashboard/counts", { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  contactSupport: async (data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      // The endpoint is likely /contact-support. Using baseURL override to match the pattern of other calls.
      let result = await userSecuredApi.post("contact-support/add", data, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllContactSupports: async (): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.get("contact-support", { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getContactSupportById: async (id: string | number): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.get(`contact-support/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteContactSupport: async (id: string | number): Promise<AxiosResponse> => {
    try {
      let result = await userSecuredApi.delete(`contact-support/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
