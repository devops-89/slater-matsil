import axios, { InternalAxiosRequestConfig } from "axios";
import { SERVER_ENDPOINTS } from "./serverConstant";

const authSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

authSecuredApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const authPublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.AUTH_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

const pageSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.PAGE_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

pageSecuredApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const pagePublicApi = axios.create({
  baseURL: SERVER_ENDPOINTS.PAGE_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

const mediaSecuredApi = axios.create({
  baseURL: SERVER_ENDPOINTS.MEDIA_BASEURL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

mediaSecuredApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { authSecuredApi, authPublicApi, pageSecuredApi, pagePublicApi, mediaSecuredApi };
