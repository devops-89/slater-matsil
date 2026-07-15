import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { SERVER_ENDPOINTS } from "./serverConstant";


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
    (error: AxiosError | Error) => {
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

export { authPublicApi, authSecuredApi, mediaSecuredApi, pagePublicApi, pageSecuredApi, userPublicApi, userSecuredApi, insightsPublicApi, insightsSecuredApi, roleSecuredApi };
