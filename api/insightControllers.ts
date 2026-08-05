import { AxiosResponse } from "axios";
import { insightsPublicApi, insightsSecuredApi } from "./config";

export const InsightControllers = {
  // Get all insights
  getAllInsights: async (params?: Record<string, string | number | boolean>): Promise<AxiosResponse> => {
    try {
      const mergedParams = { orderType: "asc", ...params };
      const result = await insightsPublicApi.get("all", { params: mergedParams });
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get insight by ID
  getInsightById: async (id: number | string): Promise<AxiosResponse> => {
    try {
      const result = await insightsPublicApi.get(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Create or Update insight
  upsertInsight: async (data: Record<string, unknown>): Promise<AxiosResponse> => {
    try {
      const result = await insightsSecuredApi.post("upsert", data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Delete insight
  deleteInsight: async (id: number | string): Promise<AxiosResponse> => {
    try {
      const result = await insightsSecuredApi.delete(`${id}`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
