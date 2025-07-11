"use client";
import "./vocabulary.css";
import { useRouter } from "next/navigation";

export default function Vocabulary() {
  const router = useRouter();

  return (
    <div className="vocab-bg">
      <div className="vocab-section">
        <div className="vocab-title">บทที่ 1 การทักทายแนะนำตนเอง</div>
        <div className="vocab-grid">
          <button className="vocab-card" onClick={() => router.push("/vocabulary/hello")}>สวัสดี</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/me")}>ฉัน</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/introduce")}>แนะนำ</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/good")}>สบายดี</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/thank")}>ขอบคุณ</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/sorry")}>ขอโทษ</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/meet")}>พบ</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/signname")}>ชื่อภาษามือ</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/noproblem")}>ไม่เป็นไร</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/sick")}>ไม่สบาย</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/yes")}>ใช่</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/no")}>ไม่ใช่</button>
        </div>
      </div>
      <div className="vocab-section">
        <div className="vocab-title">บทที่ 2 ตัวเลข</div>
        <div className="vocab-grid">
          <button className="vocab-card" onClick={() => router.push("/vocabulary/1")}>1</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/2")}>2</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/3")}>3</button>
          <button className="vocab-card" onClick={() => router.push("/vocabulary/4")}>4</button>
        </div>
      </div>
    </div>
  );
}