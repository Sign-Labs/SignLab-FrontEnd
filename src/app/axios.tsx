// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000/', // เปลี่ยนตาม backend
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


// ⚠️ Interceptor สำหรับจัดการ error response global
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // ถ้า token หมดอายุ หรือไม่ได้รับอนุญาต
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;