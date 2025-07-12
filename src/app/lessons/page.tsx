"use client"
import { GiNotebook } from "react-icons/gi";
import Lesson from "../components/Genlessons";
import LessonGrid from "../components/Lessongrid";
import { useRouter } from "next/navigation";
import { FaList } from "react-icons/fa6";
import "../css/lessons.css";
import { useState } from "react";

export default function Lessons() {
    const router = useRouter();
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [show4, setshow4] = useState(false);
    const [show5, setshow5] = useState(false);

    const currentStage = 1;      
    const chapterToShow = 3;     
    const totalStages = 6;      

    // ฟังก์ชันสำหรับแต่ละด่าน
    const toggleGrid1 = () => setshow1(!show1);
    const toggleGrid2 = () => setshow2(!show2);
    const toggleGrid3 = () => setshow3(!show3);
    const toggleGrid4 = () => setshow4(!show4);
    const toggleGrid5 = () => setshow5(!show5);
    
    const handleStageClick = (chapterNumber: number, stageId: number) => {
        console.log(`เริ่มบทที่ ${chapterNumber} ด่านที่ ${stageId}`);
        router.push(`/lessons/chapter/stage${chapterNumber}/${stageId}`);
    }

    return (
        <main style={{display:"flex", minHeight:"100vh"}}>
            <div style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", gap: "30px" }}>
                <div className="main_container">
                    {/* ด่านที่ 1 */}
                    <div className="main_component" style={{backgroundColor: show1 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid1} className="lesson_bar" >
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 1: พื้นฐานภาษามือ
                            </h1>
                        </button>
                        {show1 && (
                            <LessonGrid 
                                chapterNumber={1}
                                onStageClick={(stageId) => handleStageClick(1, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 2 */}
                    <div className="main_component" style={{backgroundColor: show2 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid2} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 2: คำทักทาย
                            </h1>
                        </button>
                        {show2 && (
                            <LessonGrid 
                                chapterNumber={2}
                                onStageClick={(stageId) => handleStageClick(2, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 3 */}
                    <div className="main_component" style={{backgroundColor: show3 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid3} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 3: ตัวเลขและการนับ
                            </h1>
                        </button>
                        {show3 && (
                            <LessonGrid 
                                chapterNumber={3}
                                onStageClick={(stageId) => handleStageClick(3, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 4 */}
                    <div className="main_component" style={{backgroundColor: show4 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid4} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 4: ครอบครัวและความสัมพันธ์
                            </h1>
                        </button>
                        {show4 && (
                            <LessonGrid 
                                chapterNumber={4}
                                onStageClick={(stageId) => handleStageClick(4, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 5 */}
                    <div className="main_component" style={{backgroundColor: show5 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid5} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 5: กิจกรรมประจำวัน
                            </h1>
                        </button>
                        {show5 && (
                            <LessonGrid 
                                chapterNumber={5}
                                onStageClick={(stageId) => handleStageClick(5, stageId)}/>
                        )}
                    </div>

                    {/* Coming Soon */}
                    <div className="main_component">
                        <button className="lesson_bar coming-soon">
                            <h1 className="font_main bold lesson_text">
                                Coming soon.....
                            </h1>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}