import { AxiosResponse } from "axios";
import { authPublicApi, authSecuredApi } from "./config";

export const AuthControllers = {
  login: async (data: Record<string, string>): Promise<AxiosResponse> => {
    try {
      let result = await authPublicApi.post("login", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  refresh: async (data: Record<string, string>): Promise<AxiosResponse> => {
    try {
      let result = await authPublicApi.post("refresh", data, {
        headers: {
          Authorization: `Bearer ${data.refreshToken}`
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  logout: async (): Promise<AxiosResponse> => {
    try {
      let result = await authSecuredApi.post("logout");
      return result;
    } catch (error) {
      throw error;
    }
  }
};
