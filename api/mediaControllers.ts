import { mediaSecuredApi } from "./config";

export const MediaControllers = {
  uploadMedia: async (formData: FormData) => {
    try {
      let result = await mediaSecuredApi.post("upload", formData);
      return result;
    } catch (error) {
      throw error;
    }
  },
  removeMedia: async (data: { key: string }) => {
    try {
      let result = await mediaSecuredApi.delete("remove", { data });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
