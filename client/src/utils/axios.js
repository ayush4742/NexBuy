// axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // optional, if you use cookies
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from cookies/context

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;

