// hooks/useAuthCheck.tsx
import { useEffect, useState } from "react";
import axios from "@/app/axios"; // ใช้ instance ที่มี token
import { useRouter } from "next/navigation";

export default function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/getdata"); // ดึงข้อมูล user ด้วย token
        if (res.data.success) {
          setIsAuthenticated(true);
          router.push("/lessons");
        } else {
          setIsAuthenticated(false);
          router.push("/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, isAuthenticated };
}