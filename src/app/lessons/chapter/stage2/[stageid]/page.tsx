"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigation } from '@/app/hooks/useNavigation';
import { ImCross } from "react-icons/im";
import Image from 'next/image';
import { showLoadingPopup, showSuccessPopup, showErrorPopup, showConfirmPopup, removeExistingPopup } from '@/app/components/Popup';
import '@/app/css/component.css';
import '@/app/css/container.css';
import '@/app/css/stage.css';
import axiosInstance from "@/app/axios"; // ← แก้ไข import
import { jwtDecode } from "jwt-decode";

export default function Stage() {
    const router = useRouter();
    const [showGate, setShowGate] = useState(true);
    const [progress, setProgress] = useState(0);
    const [progressstage, setProgressstage] = useState(0); 
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const [correctAnswer, setCorrectAnswer] = useState(''); // คำตอบที่ถูกต้อง
    const [currentChoices, setCurrentChoices] = useState<string[]>([]);
    const [currentRound, setCurrentRound] = useState(1); // รอบปัจจุบัน
    const [gameQuestions, setGameQuestions] = useState<any[]>([]); // เก็บคำถาม 5 รอบ
    const [life, setlife] = useState(5); // จำนวนชีวิตเริ่มต้น

    const params = useParams();
    const stageId = Array.isArray(params.stageid) ? parseInt(params.stageid[0]) : parseInt(params.stageid as string); // ← แก้ไข type
    const chapterNumber = 2; // ← แก้ไขให้ตรงกับ folder stage2
    
    console.log("Chapter:", chapterNumber); // 2
    console.log("Stage ID:", stageId);

    const questionData = [
        { id: 1, question: "1", hint: "หนึ่ง", image: "/chapter/stage2/1.png" },
        { id: 2, question: "2", hint: "สอง", image: "/chapter/stage2/2.png" },
        { id: 3, question: "3", hint: "สาม", image: "/chapter/stage2/3.png" },
        { id: 4, question: "4", hint: "สี่", image: "/chapter/stage2/4.png" },
        { id: 5, question: "5", hint: "ห้า", image: "/chapter/stage2/5.png" },
        { id: 6, question: "6", hint: "หก", image: "/chapter/stage2/6.png" },
        { id: 7, question: "7", hint: "เจ็ด", image: "/chapter/stage2/7.png" },
        { id: 8, question: "8", hint: "แปด", image: "/chapter/stage2/8.png" },
        { id: 9, question: "9", hint: "เก้า", image: "/chapter/stage2/9.png" },
        { id: 10, question: "10", hint: "สิบ", image: "/chapter/stage2/10.png" },
        { id: 11, question: "11", hint: "สิบเอ็ด", image: "/chapter/stage2/11.png" },
        { id: 12, question: "12", hint: "สิบสอง", image: "/chapter/stage2/12.png" },
        { id: 13, question: "13", hint: "สิบสาม", image: "/chapter/stage2/13.png" },
        { id: 14, question: "14", hint: "สิบสี่", image: "/chapter/stage2/14.png" },
        { id: 15, question: "15", hint: "สิบห้า", image: "/chapter/stage2/15.png" },
        { id: 16, question: "16", hint: "สิบหก", image: "/chapter/stage2/16.png" },
        { id: 17, question: "17", hint: "สิบเจ็ด", image: "/chapter/stage2/17.png" },
        { id: 18, question: "18", hint: "สิบแปด", image: "/chapter/stage2/18.png" },
        { id: 19, question: "19", hint: "สิบเก้า", image: "/chapter/stage2/19.png" },
        { id: 20, question: "20", hint: "ยี่สิบ", image: "/chapter/stage2/20.png" },
        { id: 21, question: "30", hint: "สามสิบ", image: "/chapter/stage2/21.png" },
        { id: 22, question: "40", hint: "สี่สิบ", image: "/chapter/stage2/22.png" },
        { id: 23, question: "50", hint: "ห้าสิบ", image: "/chapter/stage2/23.png" },
        { id: 24, question: "60", hint: "หกสิบ", image: "/chapter/stage2/24.png" },
        { id: 25, question: "70", hint: "เจ็ดสิบ", image: "/chapter/stage2/25.png" },
        { id: 26, question: "80", hint: "แปดสิบ", image: "/chapter/stage2/26.png" },
        { id: 27, question: "90", hint: "เก้าสิบ", image: "/chapter/stage2/27.png" },
        { id: 28, question: "100", hint: "หนึ่งร้อย", image: "/chapter/stage2/28.png" },
        { id: 29, question: "1,000", hint: "หนึ่งพัน", image: "/chapter/stage2/29.png" },
        { id: 30, question: "10,000", hint: "หนึ่งหมื่น", image: "/chapter/stage2/30.png" },
        { id: 31, question: "100,000", hint: "หนึ่งแสน", image: "/chapter/stage2/31.png" },
        { id: 32, question: "1,000,000", hint: "หนึ่งล้าน", image: "/chapter/stage2/32.png" },
        { id: 33, question: "10,000,000", hint: "สิบล้าน", image: "/chapter/stage2/33.png" },
        { id: 34, question: "100,000,000", hint: "หนึ่งร้อยล้าน", image: "/chapter/stage2/34.png" },
    ];

    // ฟังก์ชันสร้างตัวเลือก
    const generateChoices = (correctAnswer: string) => {
        const wrongAnswers = questionData
            .filter(item => item.question !== correctAnswer)
            .map(item => item.question);
        
        // สุ่มเลือก 3 คำตอบผิด
        const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5);
        const selectedWrong = shuffledWrong.slice(0, 3);
        
        // รวมกับคำตอบถูก แล้วสุ่มลำดับ
        const allChoices = [...selectedWrong, correctAnswer];
        return allChoices.sort(() => Math.random() - 0.5);
    };

    // สุ่มคำถาม 5 รอบ
    const generateGameQuestions = () => {
        const shuffledQuestions = [...questionData].sort(() => Math.random() - 0.5);
        const selected5Questions = shuffledQuestions.slice(0, 5);
        
        const gameData = selected5Questions.map((question, index) => ({
            round: index + 1,
            correctAnswer: question.question,
            hint: question.hint,
            image: question.image,
            choices: generateChoices(question.question)
        }));
        
        return gameData;
    };

    // เริ่มเกมใหม่
    const startNewGame = () => {
        const newGameQuestions = generateGameQuestions();
        setGameQuestions(newGameQuestions);
        setCurrentRound(1);
        setProgressstage(0);
        setlife(5); // ← รีเซ็ตชีวิต
        
        // ตั้งค่ารอบแรก
        if (newGameQuestions.length > 0) {
            const firstQuestion = newGameQuestions[0];
            setCorrectAnswer(firstQuestion.correctAnswer);
            setCurrentChoices(firstQuestion.choices);
            setCurrentImageIndex(0);
        }
    };

    // ไปรอบถัดไป
    const nextRound = () => {
        if (currentRound < 5 && currentRound < gameQuestions.length) {
            const nextRoundData = gameQuestions[currentRound]; // currentRound เป็น 0-based
            setCurrentRound(prev => prev + 1);
            setProgressstage(prev => prev + 1);
            setCorrectAnswer(nextRoundData.correctAnswer);
            setCurrentChoices(nextRoundData.choices);
        }
    };

    const checkAnswer = async (selectedAnswer: string) => {
        if (life === 1) {
            setTimeout(() => {
                showErrorPopup(`หัวใจคุณหมดแล้ว`);
                window.history.back();
            }, 100);
            return;
        }

        if (selectedAnswer === correctAnswer) {
            showSuccessPopup(`ถูกต้อง! คำตอบคือ: ${correctAnswer}`);

            if (currentRound < 5) {
                nextRound(); // ไปรอบถัดไป
            } else {
                setProgressstage(prev => prev + 1);

                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        console.error("ไม่พบ token");
                        return;
                    }

                    const decoded: any = jwtDecode(token);
                    const userId = decoded.id;

                    const res = await axiosInstance.post("/update-progress", { // ← ใช้ axiosInstance
                        user_id: userId,
                        stage_id: stageId
                    });

                    if (res.data.success) {
                        console.log("อัปเดต progress สำเร็จ และเพิ่มแต้มแล้ว");
                    } else {
                        console.warn("ไม่อัปเดต:", res.data.message);
                    }
                } catch (error) {
                    console.error("เกิดข้อผิดพลาดในการอัปเดต progress:", error);
                }

                showSuccessPopup(`คุณผ่านด่านแล้ว`);

                setTimeout(() => {
                    window.history.back();
                }, 2000);
            }
        } else {
            showErrorPopup(`ผิด! ยังไม่ถูกต้อง`);
            setlife(prev => prev - 1); // ลดจำนวนชีวิต
        }
    };

    const calculateProgress = () => {
        return (progressstage / 5) * 100;
    };

    const reset = () => {
        startNewGame(); // เริ่มเกมใหม่
    };

    // เริ่มเกมเมื่อโหลดหน้า
    useEffect(() => {
        startNewGame();
    }, []);

    useEffect(() => {
        setProgress(calculateProgress());
    }, [progressstage]); 

    const currentQuestionData = gameQuestions[currentRound - 1] || gameQuestions[0];

    return (
        <main className='container_outer'>
           <div className="login_container_top" style={{display: 'flex',alignItems: 'center',gap: '50px'}}>
                <button onClick={() => window.history.back()} style={{ 
                    background: "transparent", 
                    border: "none", 
                    padding: 0, 
                    cursor: "pointer",
                    flexShrink: 0
                }}>
                    <AiOutlineLeft size={35} className="back-button" />
                </button>

                <div style={{
                    flex: 1,
                    height: '12px',
                    background: 'var(--lightgray)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--boldskyblue)',
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>

                <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    flexShrink: 0
                }}>
                    <h1 className='icon_size black'>{progressstage}/5</h1>
                </span>
            </div>

            <div className="progress-container" style={{
                 backgroundColor:"transparent", 
                padding: '20px', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>
                {/* แสดงรูปของรอบปัจจุบัน */}
                {currentQuestionData && (
                    <Image
                        src={currentQuestionData.image}
                        alt={`รอบที่ ${currentRound}`}
                        width={600}          
                        height={350}        
                        style={{ borderRadius: '10px', objectFit: 'cover' }}
                    />
                )}

                {/* แสดงข้อมูลรอบปัจจุบัน */}
                <div style={{ textAlign: 'center', color: 'var(--foreground)' }}>
                    <h2>รอบที่ {currentRound} จาก 5</h2>
                    <h3>รูปนี้คือสัญลักษณ์อะไร?</h3>
                    <h4 className='bold font_style' style={{color:"var(--red)"}} >สามารถตอบได้อีก {life} ครั้ง</h4>
                </div>

                {/* แสดงตัวเลือกของรอบปัจจุบัน */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '10px', 
                    width: '100%', 
                    maxWidth: '400px' 
                }}>
                    {currentChoices.map((choice, index) => (
                        <button
                            key={index}
                            style={{
                                padding: '15px',
                                background: '#2196f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            onClick={() => checkAnswer(choice)}
                        >
                            <p className="font-botton font-style" >{choice}</p>
                        </button>
                    ))}
                </div>

                {/* ปุ่มควบคุม */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => showSuccessPopup(`คำใบ้: ${currentQuestionData?.hint || ''}`)} // ← เพิ่ม optional chaining
                        style={{
                            padding: '10px 20px',
                            background: 'var(--softorange)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        <p className ="font-botton font-style">คำใบ้</p>
                    </button>
                    <button 
                        onClick={reset}
                        style={{
                            padding: '10px 20px',
                            background: 'var(--red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        <p className ="font-botton font-style">เริ่มเกมใหม่</p>
                    </button>
                </div>
            </div>
        </main>
    );
}