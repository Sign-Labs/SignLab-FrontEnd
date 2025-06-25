"use client"
import "./css/container.css"; 
import "./css/component.css";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();
  const handleClick = (command: string) => {
    router.push(`/${command}`);
    console.log("Register button clicked");
  }
  
  return (
    <main className="container_outer">
      <div className="container_top">
        <h1 className="font_heading bold">Sign Lab</h1>
        <button className="first_button_register" onClick={() => handleClick("login")}>
          <h1 className="font_description normal">ฉันมีบัญชีอยู่แล้ว</h1>
        </button>
      </div>
      <div className="container_bottom">
        <img src={"./picintro.png"} alt="Introduction" />
        <div className="first_container_bottom_left">
          <h1 className="font_heading_Skyblue">เรียนภาษามือง่าย ๆ ได้ทุกที่ ทุกเวลา</h1>
          <button className="first_button_getstart"onClick={() => handleClick("register")}>
            <h1 className="font_description_white normal">มาเริ่มกันเลย</h1>
          </button>
        </div>
      </div>
    </main>
  );
}