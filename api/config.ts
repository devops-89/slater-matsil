import axios, { InternalAxiosRequestConfig } from "axios";
import { SERVER_ENDPOINTS } from "./serverConstant";

// Helper function to dispatch loader events (only in browser)
const dispatchLoader = (type: "show" | "hide") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(type === "show" ? "showLoader" : "hideLoader"));
  }
};

const setupInterceptors = (apiInstance: any, secured: boolean) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      dispatchLoader("show");
      if (secured && typeof window !== "undefined") {
        let token = localStorage.getItem("accessToken");
        if (token && config.method?.toLowerCase() !== 'get') {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return config;
    },
    (error: any) => {
      dispatchLoader("hide");
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response: any) => {
      dispatchLoader("hide");
      return response;
    },
    (error: any) => {
      dispatchLoader("hide");
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

export { authPublicApi, authSecuredApi, mediaSecuredApi, pagePublicApi, pageSecuredApi, userPublicApi, userSecuredApi };
