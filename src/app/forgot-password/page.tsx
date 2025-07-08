"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";

import "../css/component.css"; 
import "../css/container.css";

export default function Forgot() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const handleChangePassword = () => {
        if (password === confirmPassword && password !== "" && confirmPassword !== "" && email !== "") {
           
            router.push("/otp");
        } else {
            if (email === "")
            {
                showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอกอีเมล");
            }
            else if (password === "")
            {
                showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอกรหัสผ่าน");
            }
            else
            {
                showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน");
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
                <input type="email" placeholder="อีเมล" className="input_button" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="รหัสผ่าน" className="input_button" value={password} onChange={(e) => setPassword(e.target.value)} /> 
                <input type="password" placeholder="ยืนยันรหัสผ่าน" className="input_button" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> 
                </form>
                <button type= "submit" className="first_button_getstart" onClick={() => handleChangePassword()}>
                        <h1 className="font_description_white normal">ขอรหัส OTP</h1>
                </button>
            </div>

        </main>
    );
}
