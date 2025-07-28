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
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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
    };

    const startCamera = async () => {
        try {
            // ตรวจสอบว่าเบราว์เซอร์รองรับหรือไม่
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showErrorPopup('เบราว์เซอร์ของคุณไม่รองรับการใช้งานกล้อง\nกรุณาใช้ Chrome, Firefox หรือ Edge เวอร์ชันใหม่');
                return false;
            }

            console.log('Requesting camera access...');
            
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640, min: 320, max: 1280 },
                    height: { ideal: 480, min: 240, max: 720 },
                    facingMode: 'user'
                },
                audio: false
            });
            
            console.log('Camera access granted!');
            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                
                // รอให้วิดีโอโหลดเสร็จ
                videoRef.current.onloadedmetadata = () => {
                    console.log('Video metadata loaded');
                    if (videoRef.current) {
                        videoRef.current.play().catch(console.error);
                    }
                };
            }
            
            return true;
        } catch (error: any) {
            console.error('Error accessing camera:', error);
            
            let errorMessage = 'ไม่สามารถเปิดกล้องได้';
            
            switch (error.name) {
                case 'NotAllowedError':
                case 'PermissionDeniedError':
                    errorMessage = 'กรุณาอนุญาตการใช้งานกล้อง\n\n1. คลิกไอคอนกล้องที่แถบ URL\n2. เลือก "อนุญาต" หรือ "Allow"\n3. รีเฟรชหน้าเว็บ';
                    break;
                case 'NotFoundError':
                case 'DevicesNotFoundError':
                    errorMessage = 'ไม่พบกล้องในอุปกรณ์ของคุณ\nกรุณาตรวจสอบการเชื่อมต่อกล้อง';
                    break;
                case 'NotReadableError':
                case 'TrackStartError':
                    errorMessage = 'กล้องถูกใช้งานโดยแอปอื่นอยู่\nกรุณาปิดแอปอื่นที่ใช้กล้อง';
                    break;
                case 'OverconstrainedError':
                case 'ConstraintNotSatisfiedError':
                    errorMessage = 'กล้องไม่รองรับขนาดที่ต้องการ\nลองใช้กล้องอื่น';
                    break;
                case 'SecurityError':
                    errorMessage = 'การเชื่อมต่อไม่ปลอดภัย\nต้องใช้ HTTPS หรือ localhost';
                    break;
                default:
                    errorMessage = `เกิดข้อผิดพลาด: ${error.message || 'ไม่ทราบสาเหตุ'}`;
            }
            
            showErrorPopup(errorMessage);
            return false;
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            setStream(null);
            
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const toggleCamera = async () => {
        if (isCameraOpen) {
            stopCamera();
            setIsCameraOpen(false);
            showSuccessPopup("ปิดกล้องแล้ว");
        } else {
            const success = await startCamera();
            if (success) {
                setIsCameraOpen(true);
                showSuccessPopup("เปิดกล้องแล้ว! ลองทำท่าภาษามือตามวิดีโอ");
            }
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stream]);

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
                gap: '15px'
            }}>
                {/* วิดีโอและกล้อง */}
                <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {/* วิดีโอตัวอย่าง */}
                    {currentQuestion && (
                        <div style={{ textAlign: 'center' }}>
                            <video
                                key={currentQuestion.video}
                                src={currentQuestion.video}
                                width={400}          
                                height={300}         
                                autoPlay             
                                loop                 
                                muted                
                                playsInline          
                                controls={false}     
                                preload="auto"       
                                style={{ 
                                    borderRadius: '10px', 
                                    objectFit: 'cover',
                                    backgroundColor: '#000',
                                    border: '2px solid var(--lightgray)'
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

                   
                    {isCameraOpen && (
                        <div style={{ textAlign: 'center' }}>
                            <video
                                ref={videoRef}
                                width={400}
                                height={300}
                                autoPlay
                                playsInline
                                muted
                                style={{ 
                                    borderRadius: '10px',
                                    backgroundColor: '#000',
                                    transform: 'scaleX(-1)',
                                    border: '2px solid var(--green)'
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* แสดงคำตอบ */}
                <div style={{ textAlign: 'center', color: 'var(--foreground)' }}>
                    <h2 style={{ 
                        fontSize: '32px', 
                        fontWeight: 'bold',
                        color: 'var(--boldskyblue)',
                        margin: '10px 0'
                    }}>
                        {currentQuestion?.correctAnswer || 'กำลังโหลด...'}
                    </h2>
                    <h3 style={{ 
                        fontSize: '18px',
                        color: 'var(--lightgray)',
                        margin: '5px 0'
                    }}>
                        ({currentQuestion?.hint || ''})
                    </h3>
                    <p style={{
                        fontSize: '16px',
                        color: 'var(--foreground)',
                        margin: '15px 0'
                    }}>
                        ดูวิดีโอและลองทำท่าตาม
                    </p>
                </div>

                {/* ปุ่มควบคุม */}
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center' 
                }}>
                    <button 
                        onClick={toggleCamera}
                        style={{
                            padding: '15px 30px',
                            background: isCameraOpen ? 'var(--red)' : 'var(--green)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        {isCameraOpen ? 'ปิดกล้อง' : 'เปิดกล้อง'}
                    </button>
                    
                
                    
                    <button 
                        onClick={startNewQuestion}
                        style={{
                            padding: '15px 30px',
                            background: 'var(--boldskyblue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                         คำถามใหม่
                    </button>
                </div>


                {/* ข้อมูลการใช้งาน */}
                <div style={{
                    padding: '15px',
                    background: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginTop: '10px',
                    maxWidth: '500px'
                }}>
                    <h4 style={{ 
                        color: 'var(--foreground)', 
                        margin: '0 0 10px 0',
                        fontSize: '16px'
                    }}>
                        📋 วิธีการใช้งาน
                    </h4>
                    <ul style={{
                        textAlign: 'left',
                        color: 'var(--coolgray)',
                        fontSize: '14px',
                        margin: 0,
                        paddingLeft: '20px'
                    }}>
                        <li>กดปุ่ม "ทดสอบกล้อง" เพื่อตรวจสอบอุปกรณ์</li>
                        <li>กดปุ่ม "เปิดกล้อง" และอนุญาตการใช้งาน</li>
                        <li>ดูวิดีโอตัวอย่างและทำท่าตาม</li>
                        <li>กดปุ่ม "คำถามใหม่" เพื่อสุ่มคำศัพท์ใหม่</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}