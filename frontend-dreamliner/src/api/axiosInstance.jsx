import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const publicAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Public API

publicAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

publicAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return Promise.reject(error);
  },
);

// Private API

privateAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.access_token;

    if (!token) {
      toast.error("No access token found. Please log in.");
      return Promise.reject("No access token found");
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "/login";
    } else {
      const message = response?.data?.message || "Something went wrong";
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default privateAPI;
