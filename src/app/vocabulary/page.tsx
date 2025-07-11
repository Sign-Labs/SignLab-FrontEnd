"use client";
import "./vocabulary.css";
import { useState } from "react";

export default function Vocabulary() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState("");

  const handlePopup = (text: string) => {
    setPopupText(text);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  return (
    <div className="vocab-bg">
      <div className="vocab-section">
        <div className="vocab-title">การทักทายแนะนำตนเอง</div>
        <div className="vocab-grid">
          <button className="vocab-card" onClick={() => handlePopup("สวัสดี")}>สวัสดี</button>
          <button className="vocab-card" onClick={() => handlePopup("ฉัน")}>ฉัน</button>
          <button className="vocab-card" onClick={() => handlePopup("แนะนำ")}>แนะนำ</button>
          <button className="vocab-card" onClick={() => handlePopup("สบายดี")}>สบายดี</button>
          <button className="vocab-card" onClick={() => handlePopup("ขอบคุณ")}>ขอบคุณ</button>
          <button className="vocab-card" onClick={() => handlePopup("ขอโทษ")}>ขอโทษ</button>
          <button className="vocab-card" onClick={() => handlePopup("พบ")}>พบ</button>
          <button className="vocab-card" onClick={() => handlePopup("ชื่อภาษามือ")}>ชื่อภาษามือ</button>
          <button className="vocab-card" onClick={() => handlePopup("ไม่เป็นไร")}>ไม่เป็นไร</button>
          <button className="vocab-card" onClick={() => handlePopup("ไม่สบาย")}>ไม่สบาย</button>
          <button className="vocab-card" onClick={() => handlePopup("ใช่")}>ใช่</button>
          <button className="vocab-card" onClick={() => handlePopup("ไม่ใช่")}>ไม่ใช่</button>
        </div>
      </div>
      <div className="vocab-section">
        <div className="vocab-title">ตัวเลข</div>
        <div className="vocab-grid">
          <button className="vocab-card" onClick={() => handlePopup("1")}>1</button>
          <button className="vocab-card" onClick={() => handlePopup("2")}>2</button>
          <button className="vocab-card" onClick={() => handlePopup("3")}>3</button>
          <button className="vocab-card" onClick={() => handlePopup("4")}>4</button>
          <button className="vocab-card" onClick={() => handlePopup("5")}>5</button>
          <button className="vocab-card" onClick={() => handlePopup("6")}>6</button>
          <button className="vocab-card" onClick={() => handlePopup("7")}>7</button>
          <button className="vocab-card" onClick={() => handlePopup("8")}>8</button>
          <button className="vocab-card" onClick={() => handlePopup("9")}>9</button>
          <button className="vocab-card" onClick={() => handlePopup("10")}>10</button>
          <button className="vocab-card" onClick={() => handlePopup("11")}>11</button>
          <button className="vocab-card" onClick={() => handlePopup("12")}>12</button>
          <button className="vocab-card" onClick={() => handlePopup("13")}>13</button>
          <button className="vocab-card" onClick={() => handlePopup("14")}>14</button>
          <button className="vocab-card" onClick={() => handlePopup("15")}>15</button>
          <button className="vocab-card" onClick={() => handlePopup("16")}>16</button>
          <button className="vocab-card" onClick={() => handlePopup("17")}>17</button>
          <button className="vocab-card" onClick={() => handlePopup("18")}>18</button>
          <button className="vocab-card" onClick={() => handlePopup("19")}>19</button>
          <button className="vocab-card" onClick={() => handlePopup("20")}>20</button>
          <button className="vocab-card" onClick={() => handlePopup("30")}>30</button>
          <button className="vocab-card" onClick={() => handlePopup("40")}>40</button>
          <button className="vocab-card" onClick={() => handlePopup("50")}>50</button>
          <button className="vocab-card" onClick={() => handlePopup("60")}>60</button>
          <button className="vocab-card" onClick={() => handlePopup("70")}>70</button>
          <button className="vocab-card" onClick={() => handlePopup("80")}>80</button>
          <button className="vocab-card" onClick={() => handlePopup("90")}>90</button>
          <button className="vocab-card" onClick={() => handlePopup("100")}>100</button>
        </div>
      </div>
      <div className="vocab-section">
        <div className="vocab-title">วันและเวลา</div>
        <div className="vocab-grid">
          <button className="vocab-card" onClick={() => handlePopup("วันจันทร์")}>วันจันทร์</button>
          <button className="vocab-card" onClick={() => handlePopup("วันอังคาร")}>วันอังคาร</button>
          <button className="vocab-card" onClick={() => handlePopup("วันพุธ")}>วันพุธ</button>
          <button className="vocab-card" onClick={() => handlePopup("วันพฤหัสบดี")}>วันพฤหัสบดี</button>
          <button className="vocab-card" onClick={() => handlePopup("วันศุกร์")}>วันศุกร์</button>
          <button className="vocab-card" onClick={() => handlePopup("วันเสาร์")}>วันเสาร์</button>
          <button className="vocab-card" onClick={() => handlePopup("วันอาทิตย์")}>วันอาทิตย์</button>
          <button className="vocab-card" onClick={() => handlePopup("ตอนนี้")}>ตอนนี้</button>
          <button className="vocab-card" onClick={() => handlePopup("เมื่อวานนี้")}>เมื่อวานนี้</button>
          <button className="vocab-card" onClick={() => handlePopup("มะรืนนี้")}>มะรืนนี้</button>
          <button className="vocab-card" onClick={() => handlePopup("เมื่อวานซืน")}>เมื่อวานซืน</button>
          <button className="vocab-card" onClick={() => handlePopup("วัน")}>วัน</button>
          <button className="vocab-card" onClick={() => handlePopup("สัปดาห์")}>สัปดาห์</button>
          <button className="vocab-card" onClick={() => handlePopup("เดือน")}>เดือน</button>
          <button className="vocab-card" onClick={() => handlePopup("ปี")}>ปี</button>
          <button className="vocab-card" onClick={() => handlePopup("ชั่วโมง")}>ชั่วโมง</button>
          <button className="vocab-card" onClick={() => handlePopup("นาที")}>นาที</button>
          <button className="vocab-card" onClick={() => handlePopup("วินาที")}>วินาที</button>
          <button className="vocab-card" onClick={() => handlePopup("มกราคม")}>มกราคม</button>
          <button className="vocab-card" onClick={() => handlePopup("กุมภาพันธ์")}>กุมภาพันธ์</button>
          <button className="vocab-card" onClick={() => handlePopup("มีนาคม")}>มีนาคม</button>
          <button className="vocab-card" onClick={() => handlePopup("เมษายน")}>เมษายน</button>
          <button className="vocab-card" onClick={() => handlePopup("พฤษภาคม")}>พฤษภาคม</button>
          <button className="vocab-card" onClick={() => handlePopup("มิถุนายน")}>มิถุนายน</button>
          <button className="vocab-card" onClick={() => handlePopup("กรกฎาคม")}>กรกฎาคม</button>
          <button className="vocab-card" onClick={() => handlePopup("สิงหาคม")}>สิงหาคม</button>
          <button className="vocab-card" onClick={() => handlePopup("กันยายน")}>กันยายน</button>
          <button className="vocab-card" onClick={() => handlePopup("ตุลาคม")}>ตุลาคม</button>
          <button className="vocab-card" onClick={() => handlePopup("พฤศจิกายน")}>พฤศจิกายน</button>
          <button className="vocab-card" onClick={() => handlePopup("ธันวาคม")}>ธันวาคม</button>
        </div>
        </div>
        {popupOpen && (
        <div className="vocab-popup-bg" onClick={closePopup}>
          <div className="vocab-popup" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{popupText}</div>
            <button className="vocab-popup-close" onClick={closePopup}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
}