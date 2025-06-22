"use client";
import { AiOutlineLeft } from "react-icons/ai";
import styles from "../css/page.module.css"; 
import "../css/component.css"; // Corrected import statement

export default function Login() {
   
    return (
        <main className={styles.container}>
            <div className={styles.containertop}>
                <button onClick={() => window.history.back()}style={{background: "transparent", border: "none",padding: 0,cursor: "pointer"}}>
                 <AiOutlineLeft size={45} style={{ strokeWidth: 30, color: "#171717"}} />
                </button>
            </div>
            <div className="login_container_outer">
                <h1 className={styles.title}>เข้าสู่ระบบ</h1>
                
            </div>
        </main>
    );
}