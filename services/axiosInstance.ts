import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getAccessToken } from "./storage";
import toast from "react-hot-toast";
import { debounce } from "@/common/utils";

const debouncedErrorToast = debounce((message: string) => {
  toast.error(message);
}, 500);

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_KEY}`,
  timeout: 5000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken: string | null = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError) => {
    debouncedErrorToast(error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
