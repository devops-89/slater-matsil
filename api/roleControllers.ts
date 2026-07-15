import { AxiosResponse } from "axios";
import { roleSecuredApi } from "./config";

export const RoleControllers = {
  createRole: async (data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      let result = await roleSecuredApi.post("", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateRole: async (id: number | string, data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      let result = await roleSecuredApi.patch(`${id}`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllRoles: async (params?: Record<string, string | number | boolean>): Promise<AxiosResponse> => {
    try {
      let result = await roleSecuredApi.get("", { params });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getRoleById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await roleSecuredApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteRole: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await roleSecuredApi.delete(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
