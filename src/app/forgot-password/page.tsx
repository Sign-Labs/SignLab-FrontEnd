"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter,useSearchParams } from "next/navigation"; 
import { useState,useEffect } from "react";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import axios from "@/app/axios";
import "../css/component.css"; 
import "../css/container.css";

export default function Forgot() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
     const searchParams = useSearchParams();  // ดึง query string
    
     
  
         
    const handleChangePassword = async () => {
        if (email !== "") {
            try {
                const registrationData = encodeURIComponent(JSON.stringify({ email }));
                const res = await axios.post("/otp-forget", {
                    email,
                    purpose: "register", // หรือ "reset" แล้วแต่กรณี
                });

                removeExistingPopup();
                showSuccessPopup("ส่งสำเร็จ", "รหัส OTP ได้ถูกส่งไปยังอีเมลของคุณแล้ว");
                 
            router.push(`/otp-forget?data=${registrationData}`);

               
            } catch (err) {
                console.error("Resend OTP error", err);
                removeExistingPopup();
                showErrorPopup("ส่งไม่สำเร็จ", "ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่");
            }
        } else {
            showErrorPopup("กรุณากรอกอีเมล", "");
        }
    };
    return (
        <main className="container_outer">
            <div className="login_container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} className="back-button" />
                </button>
                <h1 className="font_heading">กรุณากรอกอีเมล</h1>
            </div>
            <div className="forgot_container_form">
            <form onSubmit={(e) => { e.preventDefault() }}>
                    <input type="text" placeholder="email" className="input_button" style={{minWidth:"600px"}} value={email} onChange={(e) => setEmail(e.target.value)} />
                  
                    
            </form>
                <button type= "submit" className="first_button_getstart" onClick={() => handleChangePassword()}>
                        <h1 className="font_description_white normal">ขอรหัส OTP</h1>
                </button>
            </div>

        </main>
    );
}
