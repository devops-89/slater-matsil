import { authPublicApi } from "./config";

export const AuthControllers = {
  login: async (data: any) => {
    try {
      let result = await authPublicApi.post("login", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
