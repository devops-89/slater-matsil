import { AxiosResponse } from "axios";
import { mediaSecuredApi } from "./config";
import { convertToWebP } from "@/utils/imageConverter";

export const MediaControllers = {
  uploadMedia: async (formData: FormData): Promise<AxiosResponse> => {
    try {
      // Check if there is an image in the formData and convert it to WebP
      const file = formData.get("image") as File;
      if (file && file instanceof File) {
        const webpFile = await convertToWebP(file);
        formData.set("image", webpFile);
      }

      let result = await mediaSecuredApi.post("upload", formData);
      return result;
    } catch (error) {
      throw error;
    }
  },
  removeMedia: async (data: { key: string }): Promise<AxiosResponse> => {
    try {
      let result = await mediaSecuredApi.delete("remove", { data });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
