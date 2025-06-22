"use client"
import styles from "./css/page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = (command: string) => {
    router.push(`/${command}`);
    console.log("Register button clicked");
  }
  
  return (
    <main className={styles.container}>
      <div className={styles.containertop}>
        <h1 className={styles.title}>Sign Lab</h1>
        <button className={styles.register_button} onClick={() => handleClick("login")}>
          <h1 className={styles.acc_text}>ฉันมีบัญชีอยู่แล้ว</h1>
        </button>
      </div>
      <div className={styles.containerbottom}>
        <img src={"./picintro.png"} alt="Introduction" />
        <div className={styles.containercenter}>
          <h1 className={styles.title2}>เรียนภาษามือง่าย ๆ ได้ทุกที่ ทุกเวลา</h1>
          <button className={styles.next_button} onClick={() => handleClick("register")}>
            <h1 className={styles.start_text}>มาเริ่มกันเลย</h1>
          </button>
        </div>
      </div>
    </main>
  );
}