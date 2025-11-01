"use client";
export const dynamic = "force-dynamic";

import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import axios from "../axios";
import "../css/component.css";
import "../css/container.css";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [registrationData, setRegistrationData] = useState("");

  // ✅ State สำหรับดึง query params หลัง client render
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (!data) return;

    try {
      const decoded = decodeURIComponent(data);
      const parsed = JSON.parse(decoded);
      setEmail(parsed.email);
      setRegistrationData(data);
    } catch (err) {
      console.error("Invalid query data", err);
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;

    showConfirmPopup("ส่ง OTP ใหม่", "ต้องการส่งรหัส OTP ใหม่หรือไม่?", async () => {
      showLoadingPopup("กำลังส่ง OTP", "กรุณารอสักครู่...");
      try {
        await axios.post("/otp-forget", {
          email,
          purpose: "reset",
        });
        removeExistingPopup();
        showSuccessPopup("ส่งสำเร็จ", "รหัส OTP ได้ถูกส่งไปยังอีเมลของคุณแล้ว");
      } catch (err) {
        console.error("Resend OTP error", err);
        removeExistingPopup();
        showErrorPopup("ส่งไม่สำเร็จ", "ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่");
      }
    });
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6 || !email) {
      showErrorPopup("ข้อมูลไม่ถูกต้อง", "กรุณากรอก OTP ให้ครบ 6 หลัก");
      return;
    }

    showLoadingPopup("กำลังตรวจสอบ", "กรุณารอสักครู่...");

    try {
      await axios.post("/verify-otp", { email, otp: otpCode });
      removeExistingPopup();
      showSuccessPopup("สำเร็จ", "กรุณาเปลี่ยนรหัสผ่าน", () => {
        router.push(`/change-password?data=${registrationData}`);
      });
    } catch (err: any) {
      console.error("ERROR:", err.response?.data || err.message);
      removeExistingPopup();
      const msg = err?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่";
      showErrorPopup("ไม่สำเร็จ", msg);
    }
  };

  return (
    <main className="container_outer">
      <div className="login_container_top">
        <button
          onClick={() => window.history.back()}
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
        >
          <AiOutlineLeft size={45} className="back-button" />
        </button>
      </div>

      <div className="otp_container_center">
        <div className="otp_white_box">
          <div>
            <h1 className="font_heading">กรอกรหัส OTP</h1>
            <p className="font_description">
              รหัสผ่านได้ถูกส่งไปยังอีเมล <strong>{email || "-"}</strong>
            </p>
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
                  if (e.key === "Backspace" && !digit && index > 0) {
                    const prevInput = document.getElementById(`otp-${index - 1}`);
                    prevInput?.focus();
                  }
                }}
              />
            ))}
          </div>

          <h1 className="font_description">
            ไม่ได้รับรหัส OTP?{" "}
            <button
              onClick={handleResendOtp}
              className="otp_resend_link"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <p className="otp_resend_link bold">ส่งอีกครั้ง</p>
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
