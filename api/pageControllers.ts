import { pageSecuredApi, pagePublicApi } from "./config";

export const PageControllers = {
  getAllPages: async () => {
    try {
      let result = await pageSecuredApi.get("all");
      return result;
    } catch (error) {
      throw error;
    }
  },

  createPage: async (data: any) => {
    try {
      let result = await pageSecuredApi.post("create", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  updatePage: async (id: number | string, data: any) => {
    try {
      let result = await pageSecuredApi.patch(`update/${id}`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getPageById: async (id: number | string) => {
    try {
      let result = await pageSecuredApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
