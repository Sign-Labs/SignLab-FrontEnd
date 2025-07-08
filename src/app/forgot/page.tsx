"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
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
            alert("รหัสผ่านถูกเปลี่ยนเรียบร้อยแล้ว");
            router.push("/otp");
        } else {
            alert("รหัสผ่านไม่ถูกต้อง");
        }
    };
    const otpchecker = () =>
    {
        
    }
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
                    <input type="email" placeholder="อีเมล" className="input_button" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <input type="" placeholder="OTP" className="input_button" value={password} onChange={(e) => setPassword(e.target.value)} /> 
                <button type="submit" className="first_button_getstart" onClick={() => otpchecker()}>ขอOTP</button>
                    </div>
                    
                </form>
                <button type= "submit" className="first_button_getstart" onClick={() => handleChangePassword()}>
                        <h1 className="font_description_white normal">ขอรหัส OTP</h1>
                </button>
            </div>

        </main>
    );
}
