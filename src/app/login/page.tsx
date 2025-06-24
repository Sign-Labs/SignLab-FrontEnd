"use client";
import { AiOutlineLeft } from "react-icons/ai";
import "../css/component.css"; 
import "../css/container.css";


export default function Login() {
   
    return (
        <main className="container_outer">
            <div className="container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} style={{ strokeWidth: 30, color: "#171717"}} />
                </button>
            </div>
            <div className="login_container_outer">
                <div className="container_bottom" style={{marginTop : -20}}>
                    <h1 className="font_heading">เข้าสู่ระบบ</h1>
                </div>
                <div className="login_container_inner">
                    <img src={"./picintro.png"} alt="Introduction" />
                    <div className="login_container_inner_right">
                        <input type="email" placeholder="อีเมล" className="input_button" />
                        <input type="password" placeholder="รหัสผ่าน" className="input_button" />
                        <div style={{justifyContent: "center",alignItems: "center",display: "flex",flexDirection: "column"}}>
                        <button className="first_button_getstart">
                            <h1 className="font_description_white normal">เข้าสู่ระบบ</h1>
                            </button>
                        
                        <h1 className="font_description light">ลืมรหัสผ่าน?</h1>
                        </div>
                    </div>
                </div>
                
            </div>
        </main>
    );
}