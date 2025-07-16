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
import useAuthCheck from "../hooks/useAuthCheck";
import { jwtDecode } from "jwt-decode";

export default function Lessons() {
    const router = useRouter();
    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);
    const [show3, setshow3] = useState(false);
    const [show4, setshow4] = useState(false);
    const [show5, setshow5] = useState(false);
    const { loading, isAuthenticated } = useAuthCheck();

    const [userName, setUserName] = useState("ผู้ใช้");
    const [userProgress, setUserProgress] = useState({
        lastCompletedChapter: 0,
        lastCompletedStage: 0,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                
                if (!token) {
                    showErrorPopup("ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาเข้าสู่ระบบใหม่");
                    // ← เพิ่ม delay ก่อน redirect
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                    return;
                }

                // ← แก้ไข: เช็ค token ก่อนใช้
                const decoded: any = jwtDecode(token);
                console.log("User ID from token:", decoded.id);

                const userRes = await axiosInstance.get("/getdata");
                if (userRes.data.success) {
                    const user = userRes.data.user;
                    setUserName(user.name || user.username || "ผู้ใช้");

                    // ดึง progress ของ user คนนี้
                    const progressRes = await axiosInstance.get(`/stage-progress/${decoded.id}`);
                    if (progressRes.data.success && progressRes.data.progress) {
                        setUserProgress({
                            lastCompletedChapter: progressRes.data.progress.lesson_id + 1,
                            lastCompletedStage: progressRes.data.progress.last_stage_id,
                        });
                    } else {
                        setUserProgress({
                            lastCompletedChapter: 1,
                            lastCompletedStage: 0,
                        });
                    }
                }
            } catch (err: any) {
                console.error("Error fetching user data:", err);
                // หาก token หมดอายุหรือล้มเหลว
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    showErrorPopup("ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาเข้าสู่ระบบใหม่");
                    // ← เพิ่ม delay ก่อน redirect
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                } else {
                    // ใช้ค่าเริ่มต้น
                    setUserName("ผู้ใช้");
                    setUserProgress({
                        lastCompletedChapter: 1,
                        lastCompletedStage: 0,
                    });
                }
            }
        };

        // ← แก้ไข: เรียก fetchUserData เฉพาะเมื่อ authenticated
        if (!loading && isAuthenticated) {
            fetchUserData();
        }
    }, [loading, isAuthenticated, router]);

    // ← เพิ่ม: เช็ค authentication และแสดง popup
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            showErrorPopup("ไม่สามารถเข้าใช้งานได้ กรุณาเข้าสู่ระบบก่อน");
            // ← delay ก่อน redirect
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    }, [loading, isAuthenticated, router]);

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

    // ← แก้ไข: แสดง Loading ขณะเช็ค authentication
    if (loading) {
        return (
            <main style={{
                display: "flex", 
                minHeight: "100vh", 
                alignItems: "center", 
                justifyContent: "center"
            }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #3498db",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 20px"
                    }}></div>
                    <p className="font_description">กำลังตรวจสอบสิทธิ์...</p>
                </div>
            </main>
        );
    }

    // ← แก้ไข: ถ้าไม่ authenticated แสดงข้อความรอ redirect
    // if (!isAuthenticated) {
    //     return (
    //         <main style={{
    //             display: "flex", 
    //             minHeight: "100vh", 
    //             alignItems: "center", 
    //             justifyContent: "center"
    //         }}>
    //             <div style={{ textAlign: "center" }}>
    //                 <p className="font_description">กำลังนำท่านไปยังหน้าเข้าสู่ระบบ...</p>
    //             </div>
    //         </main>
    //     );
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