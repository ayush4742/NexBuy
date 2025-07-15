import axios from "axios";

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Only needed if you're using cookies/auth
});

export default axiosInstance;
