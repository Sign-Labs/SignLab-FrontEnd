"use client";
import { AiOutlineLeft } from "react-icons/ai";
import styles from "../css/page.module.css"; 
import "../css/component.css"; 
import "../css/central.css"; // Corrected import statement

export default function Login() {
   
    return (
        <main className="first_container_outer">
            <div className="first_container_top">
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} style={{ strokeWidth: 30, color: "#171717"}} />
                </button>
            </div>
            <div className="login_container_outer">
                    <h1 className={styles.title}>เข้าสู่ระบบ</h1>
                <div className="login_container_inner">
                    <img src={"./picintro.png"} alt="Introduction" />
                    <div className="login_container_inner_right">
                        <input type="email" placeholder="อีเมล" className="primary_input_box" />
                    </div>
                </div>
                
            </div>
        </main>
    );
}