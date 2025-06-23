"use client"
import "./css/container.css"; 
import "./css/component.css";
import styles from "./css/page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = (command: string) => {
    router.push(`/${command}`);
    console.log("Register button clicked");
  }
  
  return (
    <main className="first_container_outer">
      <div className="first_container_top">
        <h1 className="font_heading">Sign Lab</h1>
        <button className="first_button_register" onClick={() => handleClick("login")}>
          <h1 className="first_Text_Account">ฉันมีบัญชีอยู่แล้ว</h1>
        </button>
      </div>
      <div className="first_container_bottom">
        <img src={"./picintro.png"} alt="Introduction" />
        <div className="first_container_bottom_left">
          <h1 className="font_heading_Skyblue">เรียนภาษามือง่าย ๆ ได้ทุกที่ ทุกเวลา</h1>
          <button className={styles.next_button} onClick={() => handleClick("register")}>
            <h1 className={styles.start_text}>มาเริ่มกันเลย</h1>
          </button>
        </div>
      </div>
    </main>
  );
}