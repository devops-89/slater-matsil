import { pagePublicApi, pageSecuredApi } from "./config";

export const BlogControllers = {
  // Get all blogs
  getAllBlogs: async (params?: Record<string, any>) => {
    try {
      const result = await pagePublicApi.get("blogs/all", { params });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get blog by ID
  getBlogById: async (id: number | string) => {
    try {
      const result = await pagePublicApi.get(`blog/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Create blog
  createBlog: async (data: any) => {
    try {
      const result = await pageSecuredApi.post("blog/create", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Update blog
  updateBlog: async (id: number | string, data: any) => {
    try {
      const result = await pageSecuredApi.patch(`blog/${id}`, data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Delete blog
  deleteBlog: async (id: number | string) => {
    try {
      const result = await pageSecuredApi.delete(`blog/${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
