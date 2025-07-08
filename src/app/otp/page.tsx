"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import "./../css/component.css"; 
import "./../css/container.css"; 

export default function otp() {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [email, setEmail] = useState("Clienttest@gmail.com");

    const handleOtpChange = (index:number, value:string) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleResendOtp = () => {
        showConfirmPopup(
            "ส่ง OTP ใหม่",
            "ต้องการส่งรหัส OTP ใหม่หรือไม่?",
            () => {
               
                showLoadingPopup("กำลังส่ง OTP", "กรุณารอสักครู่...");
                
                setTimeout(() => {
                    removeExistingPopup();
                    showSuccessPopup("ส่งสำเร็จ", "รหัส OTP ได้ถูกส่งไปยังอีเมลของคุณแล้ว");
                }, 2000);
            }
        );
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");
        if (otpCode.length === 4) {
            showLoadingPopup("กำลังตรวจสอบ", "กรุณารอสักครู่...");
            
            setTimeout(() => {
                removeExistingPopup();
                showSuccessPopup("ยืนยันสำเร็จ", "เข้าสู่ระบบแล้ว", () => {
                    router.push("/login");
                });
            }, 1500);
        } else {
            showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอก OTP ให้ครบ 4 หลัก");
        }
    };

    return (
        <main className="container_outer">
            <div className="login_container_top">
                <button onClick={() => window.history.back()} style={{background: "transparent", border: "none", padding: 0, cursor: "pointer"}}>
                    <AiOutlineLeft size={45} className="back-button" />
                </button>
            </div>
            <div className="otp_container_center">
                <div className="otp_white_box">
                    <div>
                        <h1 className="font_heading">กรอกรหัส OTP</h1>
                        <p className="font_description">รหัสผ่านได้ถูกส่งไปยังอีเมล <strong>{email}</strong></p>
                    </div>
                    <div className="otp_inputs_container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="otp_input"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !digit && index > 0) {
                                        const prevInput = document.getElementById(`otp-${index - 1}`);
                                        prevInput?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                    
                    <h1 className="font_description">
                        ไม่ได้รับรหัส OTP? <button 
                            onClick={handleResendOtp}
                            className="otp_resend_link"
                            style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
                        >
                            <h1 className="font_description"><p className="otp_resend_link bold">ส่งอีกครั้ง</p></h1>
                        </button>
                    </h1>
                    <div>
                        <button className="first_button_getstart" onClick={handleSubmit}>
                            <span className="font_description_white normal">ยืนยัน</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}