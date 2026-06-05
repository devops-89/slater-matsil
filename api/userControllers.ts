import { userSecuredApi } from "./config";

export const UserControllers = {
  createUser: async (data: any) => {
    try {
      let result = await userSecuredApi.post("users-create", data, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id: number | string, data: any) => {
    try {
      let result = await userSecuredApi.patch(`users/${id}`, data, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },


  getAllUsers: async (params?: any) => {
    try {
      let result = await userSecuredApi.get("users/all-with-roles", { baseURL: "/backend-api/", params });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id: number | string) => {
    try {
      let result = await userSecuredApi.get(`users/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: number | string) => {
    try {
      let result = await userSecuredApi.delete(`users/${id}`, { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },

  getDashboardCounts: async () => {
    try {
      let result = await userSecuredApi.get("users/dashboard/counts", { baseURL: "/backend-api/" });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
