"use client"
import { GiNotebook } from "react-icons/gi";
import Lesson from "../components/Genlessons";
import LessonGrid from "../components/Lessongrid";
import { useRouter } from "next/navigation";
import { FaList } from "react-icons/fa6";
import "../css/lessons.css";
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from "../components/Popup";
import { useState, useEffect } from "react";
import axiosInstance from "../axios";

export default function Lessons() {
    const router = useRouter();
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [show4, setshow4] = useState(false);
    const [show5, setshow5] = useState(false);

    // States สำหรับการจัดการ auth และข้อมูล
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string>("");
    const [userProgress, setUserProgress] = useState({
        lastCompletedChapter: 0,
        lastCompletedStage: 0
    });

    // เช็ค token และดึงข้อมูลผู้ใช้
    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            try {
                // เช็ค token ใน localStorage
                const token = localStorage.getItem('token');
                
                if (!token) {
                    // router.push('/login');
                    return;
                }

                // ทดสอบ token โดยเรียก API
                const userResponse = await axiosInstance.get("/getdata");
                if (userResponse.data.success) {
                    const userData = userResponse.data.user;
                    setUserName(userData.name || userData.username || "ผู้ใช้");
                } else {
                    setUserName("ผู้ใช้");
                }
                
                // เรียก API stage-progress
                const progressResponse = await axiosInstance.get("/stage-progress/7");
                const progressData = progressResponse.data;
                
                // ใช้ข้อมูลจาก API ตามรูป
                if (progressData.success && progressData.progress) {
                    setUserProgress({
                        lastCompletedChapter: progressData.progress.chapter_number || 0,
                        lastCompletedStage: progressData.progress.last_stage_id || 0
                    });
                } else {
                    // ถ้าไม่มีข้อมูล progress ใช้ค่าเริ่มต้น
                    setUserProgress({
                        lastCompletedChapter: 0,
                        lastCompletedStage: 0
                    });
                }

                // ถ้าทุกอย่าง OK ให้ authenticated = true
                setIsAuthenticated(true);

            } catch (error: any) {
                console.error("Authentication error:", error);
                
                // ถ้า error 401 หรือ token หมดอายุ
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    router.push('/login');
                } else {
                    // Error อื่นๆ ให้ใช้ค่าเริ่มต้น แต่ยังให้เข้าได้
                    setUserName("ผู้ใช้");
                    setUserProgress({
                        lastCompletedChapter: 0,
                        lastCompletedStage: 0
                    });
                    setIsAuthenticated(true);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchData();
    }, [router]);
    

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

    // แสดง Loading ขณะเช็ค authentication
    if (loading) {
        showLoadingPopup("กำลังโหลดข้อมูลผู้ใช้...", "กรุณารอสักครู่");
    }

    // ถ้าไม่ authenticated ไม่แสดงอะไร (จะ redirect ไป login แล้ว)
    // if (!isAuthenticated) {
    //     return null;
    // }

    return (
        <main style={{display:"flex", minHeight:"100vh"}}>
            <div style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", gap: "30px" }}>
                
                <div className="main_container">
                    {/* ด่านที่ 1 */}
                    <div className="main_component" style={{backgroundColor: show1 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid1} className="lesson_bar" >
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 1: การทักทายแนะนำตนเอง
                            </h1>
                        </button>
                        {show1 && (
                            <LessonGrid 
                                chapterNumber={1}
                                userProgress={userProgress}
                                onStageClick={(stageId) => handleStageClick(1, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 2 */}
                    <div className="main_component" style={{backgroundColor: show2 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid2} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 2: ตัวเลข
                            </h1>
                        </button>
                        {show2 && (
                            <LessonGrid 
                                chapterNumber={2}
                                userProgress={userProgress}
                                onStageClick={(stageId) => handleStageClick(2, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 3 */}
                    <div className="main_component" style={{backgroundColor: show3 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid3} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 3: พยัญชนะ
                            </h1>
                        </button>
                        {show3 && (
                            <LessonGrid 
                                chapterNumber={3}
                                userProgress={userProgress}
                                onStageClick={(stageId) => handleStageClick(3, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 4 */}
                    <div className="main_component" style={{backgroundColor: show4 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid4} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 4: สระ วรรณยุกต์
                            </h1>
                        </button>
                        {show4 && (
                            <LessonGrid 
                                chapterNumber={4}
                                userProgress={userProgress}
                                onStageClick={(stageId) => handleStageClick(4, stageId)}/>
                        )}
                    </div>

                    {/* ด่านที่ 5 */}
                    <div className="main_component" style={{backgroundColor: show5 ? "var(--skyblue)" : "transparent"}}>
                        <button onClick={toggleGrid5} className="lesson_bar">
                            <FaList size={25} />
                            <h1 className="font_main bold lesson_text">
                                บทที่ 5: วันและเวลา
                            </h1>
                        </button>
                        {show5 && (
                            <LessonGrid 
                                chapterNumber={5}
                                userProgress={userProgress}
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