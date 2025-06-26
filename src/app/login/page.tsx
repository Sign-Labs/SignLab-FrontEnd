"use client";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation"; 
import { useState } from "react";
import "../css/component.css"; 
import "../css/container.css";


export default function Login() {
    const rounter = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Login = () =>
    {
        if (email === "admin" && password === "admin") {
            rounter.push(`/home`);
        }
        else {
            alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    }
    return (
        <main className="container_outer">
            <div className="login_container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} className="back-button" />
                </button>
                <h1 className="font_heading">เข้าสู่ระบบ</h1>
            </div>
            <div className="login_container_outer">
                <div className="login_container_inner">
                    <img src={"./picintro.png"} alt="Introduction" />
                    <div className="login_container_inner_right">

                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <input type="email" placeholder="อีเมล" className="input_button" value={email} onChange={(e) =>setEmail(e.target.value)} />
                            <input type="password" placeholder="รหัสผ่าน" className="input_button" value={password} onChange={(e) => setPassword(e.target.value)} /> 
                            <div style={{justifyContent: "center",alignItems: "center",display: "flex",flexDirection: "column"}}>
                                <button type= "submit" className="first_button_getstart" onClick={() => Login()}>
                                    <h1 className="font_description_white normal">เข้าสู่ระบบ</h1>
                                </button>
                                <a href="/forgot" style={{textDecoration:"none"}}><h1 className="font_description light">ลืมรหัสผ่าน?</h1></a>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </main>
    );
}