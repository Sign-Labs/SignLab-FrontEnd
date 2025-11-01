// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL , // เปลี่ยนตาม backend
  timeout: 5000
});

// 🔐 แนบ token โดยอัตโนมัติ
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);




export default axiosInstance;