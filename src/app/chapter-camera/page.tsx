"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineLeft } from 'react-icons/ai';
import { showLoadingPopup, showSuccessPopup, showErrorPopup, removeExistingPopup } from '@/app/components/Popup';
import '@/app/css/component.css';
import '@/app/css/container.css';
import '@/app/css/stage.css';

export default function Stage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [mqttData, setMqttData] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [lastMqttData, setLastMqttData] = useState(''); // เก็บข้อมูล API ครั้งก่อน

    const params = useParams();

    const questionData = [
        {
            id: 1,
            question: "ฉัน",
            hint: "ตัวเอง",
            video: "/chapter/stage1/01.mp4",
        },
        {
            id: 2,
            question: "ขอโทษ",
            hint: "คำที่ใช้แสดงความรู้สึกผิด",
            video: "/chapter/stage1/02.mp4",
        },
        {
            id: 3,
            question: "ขอบคุณ",
            hint: "ใช้แสดงความรู้สึกขอบคุณ",
            video: "/chapter/stage1/03.mp4",
        },
        {
            id: 4,
            question: "สวัสดี",
            hint: "คำทักทาย",
            video: "/chapter/stage1/04.mp4",
        },
        {
            id: 5,
            question: "แนะนำ",
            hint: "แนะนำตัวหรือสิ่งของ",
            video: "/chapter/stage1/05.mp4",
        },
        {
            id: 6,
            question: "สบายดี",
            hint: "คำตอบเมื่อมีคนถามว่าสบายดีไหม",
            video: "/chapter/stage1/06.mp4",
        },
        {
            id: 7,
            question: "พบ (คนหนึ่งและอีกคนหนึ่งพบกัน)",
            hint: "คนหนึ่งและอีกคนหนึ่งพบกัน",
            video: "/chapter/stage1/07.mp4",
        },
        {
            id: 8,
            question: "พบ (คุณพบกับฉัน)",
            hint: "คุณพบกับฉัน",
            video: "/chapter/stage1/08.mp4",
        },
        {
            id: 9,
            question: "ชื่อภาษามือ",
            hint: "ชื่อของภาษามือ",
            video: "/chapter/stage1/09.mp4",
        },
        {
            id: 10,
            question: "ไม่เป็นไร",
            hint: "คำที่ใช้เมื่อให้อภัยหรือไม่ถือสา",
            video: "/chapter/stage1/10.mp4",
        },
        {
            id: 11,
            question: "ไม่สบาย",
            hint: "รู้สึกเจ็บป่วย",
            video: "/chapter/stage1/11.mp4",
        },
        {
            id: 12,
            question: "ใช่",
            hint: "คำยืนยัน",
            video: "/chapter/stage1/12.mp4",
        },
        {
            id: 13,
            question: "ไม่ใช่",
            hint: "คำปฏิเสธ",
            video: "/chapter/stage1/13.mp4",
        },
    ];

    // ฟังก์ชันดึงข้อมูลจาก API อัตโนมัติ
    const fetchMqttData = async () => {
        try {
            const response = await fetch('http://130.33.96.46:3000/api/mqtt/answer');
            const data = await response.json();
            
            if (data && data.data) {
                const receivedAnswer = data.data.trim().replace(/\r\n/g, '');
                
                // ✅ เช็คว่าข้อมูลใหม่หรือไม่ - เปรียบเทียบกับครั้งก่อน
                if (receivedAnswer !== lastMqttData && receivedAnswer !== '') {
                    console.log("🆕 ข้อมูลใหม่จาก API:", receivedAnswer);
                    console.log("📋 ข้อมูลครั้งก่อน:", lastMqttData);
                    
                    // อัปเดตข้อมูลที่ได้รับและเก็บค่าก่อนหน้า
                    setMqttData(receivedAnswer);
                    setLastMqttData(receivedAnswer);
                    
                    // 🎯 ตรวจสอบคำตอบเฉพาะเมื่อมีข้อมูลใหม่
                    if (currentQuestion && receivedAnswer === currentQuestion.correctAnswer) {
                        
                        setIsCorrect(true);
                        showSuccessPopup(`ถูกต้อง! คำตอบคือ: ${currentQuestion.correctAnswer}`);
                        
                        // รอ 2 วินาที แล้วสุ่มคำถามใหม่
                        setTimeout(() => {
                            startNewQuestion();
                            setIsCorrect(false);
                        }, 2000);
                        
                    } else if (receivedAnswer !== currentQuestion?.correctAnswer) {
                       
                    }
                } else {
                    // ข้อมูลเดิม - ไม่ต้องเช็คคำตอบ
                    console.log("🔄 ข้อมูลเดิม - ไม่ต้องเช็ค");
                }
            } else {
                // ไม่มีข้อมูลจาก API
                if (mqttData !== 'ไม่มีข้อมูล') {
                    setMqttData('ไม่มีข้อมูล');
                }
            }
        } catch (error) {
            console.error("Error fetching MQTT data:", error);
            if (mqttData !== 'ไม่สามารถเชื่อมต่อ API ได้') {
                setMqttData('ไม่สามารถเชื่อมต่อ API ได้');
            }
        }
    };

    // ตั้งค่า interval สำหรับตรวจสอบ API อัตโนมัติ
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMqttData();
        }, 1000); // ตรวจสอบทุก 1 วินาที

        // เรียกครั้งแรกทันที
        fetchMqttData();
        
        return () => {
            clearInterval(interval);
        };
    }, [currentQuestion, lastMqttData, mqttData]);

    const generateRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questionData.length);
        const selectedQuestion = questionData[randomIndex];
        
        return {
            correctAnswer: selectedQuestion.question,
            hint: selectedQuestion.hint,
            video: selectedQuestion.video
        };
    };

    const startNewQuestion = () => {
        const newQuestion = generateRandomQuestion();
        setCurrentQuestion(newQuestion);
        setIsCorrect(false);
        setMqttData(''); // รีเซ็ตข้อมูล MQTT
        setLastMqttData(''); // รีเซ็ตข้อมูล MQTT ครั้งก่อน
    };

    useEffect(() => {
        startNewQuestion();
    }, []);

    return (
        <main className='container_outer'>
            <div className="login_container_top" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '50px'
            }}>
                <button 
                    onClick={() => router.back()} 
                    style={{ 
                        background: "transparent", 
                        border: "none", 
                        padding: 0, 
                        cursor: "pointer",
                        flexShrink: 0
                    }}
                >
                    <AiOutlineLeft size={35} className="back-button" />
                </button>


                <div style={{ width: '35px' }}></div>
            </div>

            <div className="progress-container" style={{
                backgroundColor: "transparent", 
                padding: '20px', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }}>
                {/* วิดีโอตัวอย่าง */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>
                    {currentQuestion && (
                        <div style={{ textAlign: 'center' }}>
                            <video
                                key={currentQuestion.video}
                                src={currentQuestion.video}
                                width={450}          
                                height={350}         
                                autoPlay             
                                loop                 
                                muted                
                                playsInline          
                                controls={false}     
                                preload="auto"       
                                style={{ 
                                    borderRadius: '15px', 
                                    objectFit: 'cover',
                                    backgroundColor: '#000',
                                    border: `3px solid ${isCorrect ? 'var(--green)' : 'var(--lightgray)'}`,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }}
                                onError={(e) => {
                                    console.error('Video loading error:', e);
                                }}
                            >
                                <source src={currentQuestion.video} type="video/mp4" />
                                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                            </video>
                        </div>
                    )}
                </div>

                {/* แสดงคำตอบ */}
                <div style={{ textAlign: 'center', color: 'var(--foreground)', marginBottom: '20px' }}>
                    <h2 style={{ 
                        fontSize: '36px', 
                        fontWeight: 'bold',
                        color: isCorrect ? 'var(--green)' : 'var(--boldskyblue)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        {currentQuestion?.correctAnswer || 'กำลังโหลด...'}
                    </h2>
                    <h3 style={{ 
                        fontSize: '20px',
                        color: 'var(--lightgray)',
                        fontStyle: 'italic'
                    }}>
                        ({currentQuestion?.hint || ''})
                    </h3>
                    
                   
                       
                        <div style={{
                            padding: '10px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            <p style={{
                                color: 'var(--foreground)', 
                                fontSize: '16px',
                                margin: '0',
                                fontWeight: 'bold'
                            }}>
                                คำตอบล่าสุด : {mqttData || 'รอข้อมูล...'}
                            </p>
                        </div>             
                </div>

                {/* ปุ่มควบคุม */}
                <div style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}>
                    <button 
                        onClick={startNewQuestion}
                        style={{
                            padding: '18px 35px',
                            background: 'var(--boldskyblue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                            minWidth: '200px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                    >
                        สุ่มคำถามใหม่
                    </button>
                </div>

                {/* ข้อมูลการใช้งาน */}
                <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                    borderRadius: '15px',
                    textAlign: 'center',
                    maxWidth: '600px',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <h4 style={{ 
                        color: 'var(--foreground)', 
                        margin: '0 0 15px 0',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>
                        วิธีการใช้งาน
                    </h4>
                    <div style={{
                        textAlign: 'left',
                        color: 'var(--coolgray)',
                        fontSize: '16px',
                        lineHeight: '1.6'
                    }}>
                        <ul style={{
                            margin: '0 0 15px 0',
                            paddingLeft: '25px'
                        }}>
                            <li style={{ marginBottom: '8px' }}>ระบบตรวจสอบข้อมูลจาก API อัตโนมัติทุก 1 วินาที</li>
                            <li style={{ marginBottom: '8px' }}>เช็คคำตอบเฉพาะเมื่อมีข้อมูลใหม่จาก API</li>
                            <li style={{ marginBottom: '8px' }}>ดูวิดีโอและทำท่าภาษามือตามที่เห็น</li>
                            <li style={{ marginBottom: '8px' }}>เมื่อระบบตรวจพบคำตอบถูกต้อง จะไปคำถามใหม่อัตโนมัติ</li>
                            <li style={{ marginBottom: '8px' }}>หากตอบผิด ระบบจะแจ้งเตือนและให้ลองใหม่</li>
                            <li>กดปุ่ม "คำถามใหม่" เพื่อสุ่มคำศัพท์ใหม่ได้ตลอดเวลา</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}