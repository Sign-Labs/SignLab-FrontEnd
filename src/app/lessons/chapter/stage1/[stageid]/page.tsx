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

export default function Stage() {
    const [showGate, setShowGate] = useState(true);
    const [progress, setProgress] = useState(0);
    const [progressstage, setProgressstage] = useState(0); 
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const [correctAnswer, setCorrectAnswer] = useState(''); // คำตอบที่ถูกต้อง
    const [currentChoices, setCurrentChoices] = useState<string[]>([]);
    const [currentRound, setCurrentRound] = useState(1); // รอบปัจจุบัน
    const [gameQuestions, setGameQuestions] = useState<any[]>([]); // เก็บคำถาม 5 รอบ
    const [life,setlife] = useState(5); // จำนวนชีวิตเริ่มต้น

    const params = useParams();
    const router = useRouter();

    const questionData = [
        {
            id: 1,
            question:"ฉัน",
            hint: "ตัวเอง",
            image: "/chapter/stage1/test.jpg",
        },
        {
            id: 2,
            question: "ขอโทษ",
            hint: "คำที่ใช้แสดงความรู้สึกผิด",
            image: "/chapter/stage1/test2.jpg",
        },
        {
            id: 3,
            question: "สวัสดี",
            hint: "คำทักทาย",
            image: "/chapter/stage1/test3.jpg",
        },
        {
            id: 4,
            question: "แนะนำ",
            hint: "แนะนำ",
            image: "/chapter/stage1/test4.jpg",
        },
        {
            id: 5,
            question: "พบ(คนหนึ่งและอีกคนหนึ่งพบกัน)",
            hint: "คนหนึ่งและอีกคนหนึ่งพบกัน",
            image: "/chapter/stage1/test4.jpg",
        },
        {
            id: 6,
            question: "พบ(คุณพบกับฉัน)",
            hint: "คำที่ใช้เมื่อรู่้สึกสบาย",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 7,
            question: "ชื่อภาษามือ",
            hint: "ชื่อของภาษามือ",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 8,
            question: "ไม่เป็นไร",
            hint: "คำที่ใช้เมื่อไม่เป็นไร",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 9,
            question: "ไม่สบาย",
            hint: "ไม่สบาย",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 10,
            question: "ใช่",
            hint: "ใช่",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 11,
            question: "ไม่ใช่",
            hint: "ไม่ใช่",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id:12,
            question: "ขอบคุณ",
            hint: "ขอบคุณ",
            image: "/chapter/stage1/test5.jpg",
        },
        {
            id: 13,
            question: "สบายดี",
            hint: "สบายดี",
            image: "/chapter/stage1/test5.jpg",
        },
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

    // ตรวจคำตอบ
    const checkAnswer = (selectedAnswer: string) => {
        if(life == 1)
        {
             setTimeout(() => {
                    window.history.back();
                     showErrorPopup(`หัวใจคุณหมดแล้ว`);
                }, 100);
            // window.history.back();
        }
        else
        {
             if (selectedAnswer === correctAnswer) {
            // alert(`ถูกต้อง! รอบที่ ${currentRound}`);
            showSuccessPopup(`ถูกต้อง! คำตอบคือ: ${correctAnswer}`);
            
            if (currentRound < 5) {
                nextRound(); // ไปรอบถัดไป
            } else {
                setProgressstage(prev => prev + 1);
                setTimeout(() => {
                    window.history.back();
                
                }, 2000);
                showSuccessPopup(`คุณผ่านด่านแล้ว`);

            }
        } else {
            showErrorPopup(`ผิด! ยังไม่ถูกต้อง`);
            setlife(prev => prev - 1); // ลดจำนวนชีวิต
            
        }
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
                // backgroundColor:"red", 
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
                    <h4 className='bold font_style' style={{color:"var(--red)"}} >สามารถตอบได้อีก {life}</h4>
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
                        onClick={() => showSuccessPopup(`คำใบ้: ${currentQuestionData.hint}`)}
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
                    {currentQuestionData && (
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
                    )}
                </div>
            </div>
        </main>
    );
}