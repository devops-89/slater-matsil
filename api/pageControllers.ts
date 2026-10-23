import { AxiosResponse } from "axios";
import { pagePublicApi, pageSecuredApi } from "./config";

export const PageControllers = {
  getAllPages: async (): Promise<AxiosResponse> => {
    try {
      let result = await pageSecuredApi.get("all");
      return result;
    } catch (error) {
      throw error;
    }
  },

  updatePage: async (id: number | string, data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      let result = await pageSecuredApi.patch(`update/${id}`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getPageById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await pageSecuredApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAllPublicPages: async (): Promise<AxiosResponse> => {
    try {
      let result = await pagePublicApi.get("all");
      return result;
    } catch (error) {
      throw error;
    }
  },

  getPublicPageById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      let result = await pagePublicApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
