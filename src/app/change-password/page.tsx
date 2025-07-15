"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter,useSearchParams } from "next/navigation"; 
import { useState } from "react";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import axios from "@/app/axios";
import "../css/component.css"; 
import "../css/container.css";
import { i } from "framer-motion/client";

export default function Forgot() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const searchParams = useSearchParams(); 
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(""); // ในกรณีที่ใช้ OTP ด้วย
const data = searchParams.get("data");
if (!data) {
  console.error("ไม่พบ query data");
  return;
}


     
 const handleChangePassword = async () => {
        if (password === confirmPassword && password !== "") {
            try {
                const decoded = decodeURIComponent(data);
const parsed = JSON.parse(decoded); // <- ต้องได้ email แน่ๆ
                console.log("email is ",parsed.email)
                const res = await axios.post("/forget-password", {
                    email: parsed.email,
                    newPassword: password,
                    confirmPassword: confirmPassword
                });

                if (res.data.success) {
                    showSuccessPopup("เปลี่ยนรหัสผ่านสำเร็จ", "กรุณาเข้าสู่ระบบใหม่");
                    router.push("/login");
                } else {
                    showErrorPopup("ไม่สำเร็จ", res.data.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้");
                }

            } catch (err: any) {
                console.error("เปลี่ยนรหัสผ่านล้มเหลว:", err);
                showErrorPopup("เกิดข้อผิดพลาด", err.response?.data?.message || "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
            }
        } else {
            if (password === "") {
                showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอกรหัสผ่าน");
            } else if (confirmPassword === "") {
                showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอกยืนยันรหัสผ่าน");
            } else {
                showErrorPopup("ข้อมูลไม่ตรงกัน", "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
            }
        }
    };
    return (
        <main className="container_outer">
            <div className="login_container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} className="back-button" />
                </button>
                <h1 className="font_heading">เปลี่ยนรหัสผ่าน</h1>
            </div>
            <div className="forgot_container_form">
            <form onSubmit={(e) => { e.preventDefault() }}>
                <input type="password" placeholder="รหัสผ่าน" className="input_button" value={password} onChange={(e) => setPassword(e.target.value)} /> 
                <input type="password" placeholder="ยืนยันรหัสผ่าน" className="input_button" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> 
                </form>
                <button type= "submit" className="first_button_getstart" onClick={() => handleChangePassword()}>
                        <h1 className="font_description_white normal">ตกลง</h1>
                </button>
            </div>

        </main>
    );
}
