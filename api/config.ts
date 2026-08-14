import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { SERVER_ENDPOINTS } from "./serverConstant";

import { AuthControllers } from "./authControllers";

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const setupInterceptors = (apiInstance: AxiosInstance, secured: boolean) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (secured && typeof window !== "undefined") {
        let token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      const originalRequest = error.config;

      if (secured && error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiInstance(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await AuthControllers.refresh({ refreshToken });
          const newAccessToken = response.data?.data?.accessToken;
          const newRefreshToken = response.data?.data?.refreshToken;

          if (newAccessToken && newRefreshToken) {
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            
            processQueue(null, newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return apiInstance(originalRequest);
          } else {
             throw new Error("Failed to refresh token");
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          
          if (typeof window !== "undefined") {
             localStorage.removeItem("accessToken");
             localStorage.removeItem("refreshToken");
             localStorage.removeItem("adminAuth");
             localStorage.removeItem("isSuperAdmin");
             localStorage.removeItem("adminUserId");
             localStorage.removeItem("userName");
             document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
             window.location.href = "/admin";
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

const authSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(authSecuredApi, true);

const authPublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(authPublicApi, false);

const pageSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.PAGE_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(pageSecuredApi, true);

const pagePublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.PAGE_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(pagePublicApi, false);

const userSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.USER_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(userSecuredApi, true);

const userPublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.USER_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(userPublicApi, false);

const mediaSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.MEDIA_BASEURL,
  headers: { Accept: "application/json, text/plain, */*" },
});
setupInterceptors(mediaSecuredApi, true);

const insightsSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.INSIGHTS_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(insightsSecuredApi, true);

const insightsPublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.INSIGHTS_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(insightsPublicApi, false);

const roleSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.ROLE_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(roleSecuredApi, true);

const careersPublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.CAREERS_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(careersPublicApi, false);

const careersSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.CAREERS_BASEURL,
  headers: { "Content-Type": "application/json", Accept: "application/json, text/plain, */*" },
});
setupInterceptors(careersSecuredApi, true);

export { authPublicApi, authSecuredApi, mediaSecuredApi, pagePublicApi, pageSecuredApi, userPublicApi, userSecuredApi, insightsPublicApi, insightsSecuredApi, roleSecuredApi, careersPublicApi, careersSecuredApi };
