import { AxiosResponse } from "axios";
import { authPublicApi } from "./config";

export const AuthControllers = {
  login: async (data: Record<string, string>): Promise<AxiosResponse> => {
    try {
      let result = await authPublicApi.post("login", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
