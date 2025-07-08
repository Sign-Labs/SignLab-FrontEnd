"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import "../css/component.css";
import "../css/container.css";

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dob, setDob] = useState<Date | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.username.trim()) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณากรอกชื่อผู้ใช้");
            return;
        }
        
        if (!form.firstname.trim()) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณากรอกชื่อ");
            return;
        }
        
        if (!form.lastname.trim()) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณากรอกนามสกุล");
            return;
        }
        
        if (!form.gender) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณาเลือกเพศ");
            return;
        }
        
        if (!form.dob || !dob) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณาเลือกวันเกิด");
            return;
        }
        
        if (!form.email.trim()) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณากรอกอีเมล");
            return;
        }
        
        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showErrorPopup("รูปแบบอีเมลไม่ถูกต้อง", "กรุณากรอกอีเมลให้ถูกต้อง");
            return;
        }
        
        if (!form.password) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณากรอกรหัสผ่าน");
            return;
        }
        
        if (form.password.length < 6) {
            showErrorPopup("รหัสผ่านไม่ถูกต้อง", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return;
        }
        
        if (!form.confirmPassword) {
            showErrorPopup("ข้อมูลไม่ครบถ้วน", "กรุณายืนยันรหัสผ่าน");
            return;
        }
        
        if (form.password !== form.confirmPassword) {
            showErrorPopup("รหัสผ่านไม่ตรงกัน", "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน");
            return;
        }

        // ถ้าผ่านการตรวจสอบทั้งหมดแล้ว
        showLoadingPopup("กำลังส่ง OTP", "กรุณารอสักครู่...");
        
        setTimeout(() => {
            removeExistingPopup();
            showSuccessPopup("ส่งรหัส OTP สำเร็จ", "กรุณาตรวจสอบอีเมลของคุณ", () => {
                // ส่งข้อมูลไปหน้า OTP
                const registrationData = encodeURIComponent(JSON.stringify({
                    username: form.username,
                    firstname: form.firstname,
                    lastname: form.lastname,
                    gender: form.gender,
                    dob: form.dob,
                    email: form.email,
                    password: form.password
                }));
                router.push(`/otp?type=register&data=${registrationData}`);
            });
        }, 2000);
    };

    return (
        <main>
            <div className="login_container_top">
                <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
                    <AiOutlineLeft size={45} className="back-button" />
                </button>
                <h1 className="font_heading">ยินดีต้อนรับสู่ Sign Lab</h1>
            </div>
            <div className="login_container_outer">
                <div className="login_container_inner">
                    <img src="./picintro.png" alt="Introduction" />
                    <div className="login_container_inner_right" style={{ justifyContent:"space-between" ,flex:1 }}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <input
                                name="username"
                                type="text"
                                placeholder="ชื่อผู้ใช้"
                                className="input_button"
                                value={form.username}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                            <div style={{ display: "flex", gap: "20px" }}>
                                <input
                                    name="firstname"
                                    type="text"
                                    placeholder="ชื่อ"
                                    className="input_button"
                                    value={form.firstname}
                                    onChange={handleChange}
                                    style={{ flex: 1, minWidth: 0 }}
                                />
                                <input
                                    name="lastname"
                                    type="text"
                                    placeholder="นามสกุล"
                                    className="input_button"
                                    value={form.lastname}
                                    onChange={handleChange}
                                    style={{ flex: 1, minWidth: 0 }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <select
                                    name="gender"
                                    className="input_button"
                                    value={form.gender}
                                    onChange={handleChange}
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    <option value="" disabled hidden>เพศ</option>
                                    <option value="หญิง">หญิง</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="ไม่ระบุ">ไม่ระบุ</option>
                                </select>
                                <div style={{ flex: 1, minWidth: 0 ,width: "100%" }}>
                                    <ReactDatePicker
                                        selected={dob}
                                        onChange={(date) => {
                                            setDob(date);
                                            setForm({ ...form, dob: date ? date.toISOString().split("T")[0] : "" });
                                        }}
                                        dateFormat="dd / MM / yyyy"
                                        placeholderText="วัน / เดือน / ปี เกิด"
                                        className="input_button only_calendar"
                                        maxDate={new Date()}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                </div>
                            </div>
                            <input
                                name="email"
                                type="email"
                                placeholder="อีเมล"
                                className="input_button"
                                value={form.email}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                            <div style={{ position: "relative" }}>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="รหัสผ่าน"
                                    className="input_button"
                                    value={form.password}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="ยืนยันรหัสผ่าน"
                                    className="input_button"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center"}}>
                                <button type="submit" className="first_button_getstart" style={{ marginTop: 12}}>
                                    <h1 className="font_description_white normal">รับรหัส OTP</h1>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}