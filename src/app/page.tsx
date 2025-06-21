import Image from "next/image";
import styles from "./css/page.module.css";


export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.containertop}>
        <h1 className={styles.title}>Sign Lab</h1>
        <button className={styles.register_button}><h1 className={styles.acc_text}>ฉันมีบัญชีอยู่แล้ว</h1></button>
      </div>
      <div className={styles.containerbottom}>
        <img src={"./picintro.png"} />
        <div className={styles.containercenter}>
          <h1 className={styles.title2}>เรียนภาษามือง่าย ๆ ได้ทุกที่ ทุกเวลา</h1>
          <button className={styles.next_button}><h1 className={styles.acc_text}>มาเริ่มกันเลย</h1></button>
        </div>
      </div>
    </main>
  );
}
