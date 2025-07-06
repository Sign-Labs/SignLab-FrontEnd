"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import "./../css/component.css"; 
import "./../css/container.css"; 

export default function otp() {
     const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);

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

    const handleSubmit = () => {
        const otpCode = otp.join("");
        if (otpCode.length === 4) {
            router.push("/login");
        } else {
            alert("กรุณากรอก OTP ให้ครบ 4 หลัก");
        }
    };
    return (
        <main className="container_outer">
            <div className="login_container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                    <AiOutlineLeft size={45} className="back-button" />
                </button>
            </div>
            <div className="otp_container_center">
                
                <div className="otp_white_box">
                    <h1 className="font_heading">กรอกรหัส OTP</h1>
                    
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
                    
                    <h1 className="font_description ">
                        ไม่ได้รับรหัส OTP? <a href="#" className="otp_resend_link">ส่งอีกครั้ง</a>
                    </h1>
                    <div >
                    <button className="first_button_getstart" onClick={handleSubmit}>
                        <span className="font_description_white normal">ยืนยัน</span>
                    </button>
                    </div>
                </div>
            </div>
        </main>
    );
}