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
    const [show2,setshow2] = useState(false)
   
    const currentStage = 1;      
    const chapterToShow = 3;     
    const totalStages = 6;      

    const toggleGrid = () => {
        setshow1(!show1);
        console.log("toggle grid:", !show1);
    }
    
    const handleStageClick = (stageId: number) => {
        console.log(`เริ่มบทที่ ${chapterToShow} ด่านที่ ${stageId}`);
        router.push(`/lessons/chapter/${currentStage}/stage/${stageId}`);
    }

    return (
        <main style={{display:"flex", minHeight:"100vh"}}>
            <div style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", gap: "30px" }}>
                <div className="main_container">
                    <button onClick={toggleGrid} className="lesson_bar">
                        <FaList size={25} />
                        <h1 className="font_main bold lesson_text">
                             (บทล่าสุด : บทที่ {currentStage})
                        </h1>
                    </button>
                    {show1 && (
                    <LessonGrid 
                        chapterNumber={currentStage}
                        currentStage={chapterToShow}
                        totalStages={totalStages}
                        onStageClick={handleStageClick}/>
                )}
                </div>
                
                
            
            </div>
        </main>
    );
}