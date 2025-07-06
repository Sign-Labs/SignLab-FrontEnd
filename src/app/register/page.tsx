"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // เพิ่ม logic ส่ง OTP ที่นี่
        alert("ส่งรหัส OTP ไปที่อีเมลแล้ว");
        router.push("/otp");
    };

    return (
        <main>
            <div className="login_container_top">
                <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
                    <AiOutlineLeft size={45} className="back-button" />
                </button>
                <h1 className="font_heading">ยินดีต้อนรับรับสู่ Sign Lab</h1>
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