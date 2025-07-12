"use client";
import React from 'react';
import '../css/lessons.css';

interface LessonData {
    id: number;
    isCompleted: boolean;
    isActive: boolean;
    isLocked: boolean;
}

interface ChapterInfo {
    title: string;
    description: string;
    totalStages: number;
    currentStage: number;
}

interface LessonGridProps {
    chapterNumber: number;
    onStageClick?: (stageId: number) => void;
}

const LessonGrid = ({ 
    chapterNumber = 1,
    onStageClick 
}: LessonGridProps) => {

    //  Mock ข้อมูลจาก Backend - สมมุติ User เล่นมาถึงไหนแล้ว
    const userProgress = {
        // บทที่เสร็จล่าสุด และ ด่านล่าสุดในบทนั้น
        lastCompletedChapter: 3,    // เสร็จบทที่ 1 แล้ว
        lastCompletedStage: 5,      // เสร็จด่านที่ 5 ในบทที่ 1
        currentChapter: 4,          // กำลังเล่นบทที่ 2
        currentStage: 1             // กำลังเล่นด่านที่ 3 ในบทที่ 2
    };

    //  ข้อมูลโครงสร้างบทเรียน (ข้อมูลคงที่)
    const chaptersStructure: Record<number, Omit<ChapterInfo, 'currentStage'>> = {
        1: {
            title: "พื้นฐานภาษามือ",
            description: "เรียนรู้ท่าทางพื้นฐานและการสื่อสาร",
            totalStages: 5
        },
        2: {
            title: "คำทักทาย", 
            description: "ฝึกใช้คำทักทายและการแนะนำตัว",
            totalStages: 5
        },
        3: {
            title: "ตัวเลขและการนับ",
            description: "เรียนรู้การใช้ตัวเลขในภาษามือ",
            totalStages: 5
        },
        4: {
            title: "ครอบครัวและความสัมพันธ์",
            description: "คำศัพท์เกี่ยวกับสมาชิกในครอบครัว",
            totalStages: 5
        },
        5: {
            title: "กิจกรรมประจำวัน",
            description: "ภาษามือสำหรับกิจกรรมในชีวิตประจำวัน",
            totalStages: 5
        }
    };

   
    const calculateCurrentStage = (chapterNum: number): number => {
        if (chapterNum < userProgress.lastCompletedChapter) {
            // บทที่เสร็จแล้ว -> ทุกด่านเสร็จ
            return chaptersStructure[chapterNum]?.totalStages + 1 || 6;
        } 
        else if (chapterNum === userProgress.lastCompletedChapter) {
            // บทที่เสร็จล่าสุด -> เสร็จทุกด่าน
            return chaptersStructure[chapterNum]?.totalStages + 1 || 6;
        }
        else if (chapterNum === userProgress.currentChapter) {
            // บทที่กำลังเล่น -> ตามความคืบหน้า
            return userProgress.currentStage;
        }
        else {
            // บทที่ยังไม่เปิด -> ล็อคทุกด่าน
            return 0;  // ← เปลี่ยนจาก 1 เป็น 0
        }
    };

    const currentChapter: ChapterInfo = chaptersStructure[chapterNumber] 
        ? {
            ...chaptersStructure[chapterNumber],
            currentStage: calculateCurrentStage(chapterNumber)
          }
        : {
            title: "บทเรียนใหม่",
            description: "เตรียมตัวสำหรับการเรียนรู้",
            totalStages: 5,
            currentStage: 1
          };


    const generateLessons = (): LessonData[] => {
        const lessons: LessonData[] = [];
        
        for (let i = 1; i <= currentChapter.totalStages; i++) {
            lessons.push({
                id: i,
                isCompleted: i < currentChapter.currentStage,  // ด่านที่ผ่านแล้ว
                isActive: i === currentChapter.currentStage,   // ด่านปัจจุบัน
                isLocked: i > currentChapter.currentStage      // ด่านที่ยังล็อค
            });
        }
        
        return lessons;
    };

    const lessons = generateLessons();

    const handleLessonClick = (lessonId: number) => {
        const lesson = lessons.find(l => l.id === lessonId);
        
        if (lesson?.isLocked) {
            alert(`ยังไม่สามารถเข้าด่านนี้ได้! ทำด่าน ${currentChapter.currentStage} ให้เสร็จก่อน`);
            return;
        }

        console.log(`เริ่มบทที่ ${chapterNumber}: ${currentChapter.title} - ด่านที่ ${lessonId}`);
        
        if (onStageClick) {
            onStageClick(lessonId);
        }
    };

    return (
        <div className="lesson-grid-container">
            {/*  Grid แสดงด่าน */}
            <div className="lesson-grid-wrapper">
                <div className="lesson-grid">
                    {lessons.map((lesson) => (
                        <button
                            key={lesson.id}
                            className={`lesson-circle 
                                ${lesson.isActive ? 'active' : ''} 
                                ${lesson.isCompleted ? 'completed' : ''} 
                                ${lesson.isLocked ? 'locked' : ''}`}
                            onClick={() => handleLessonClick(lesson.id)}
                            disabled={lesson.isLocked}
                        >
                            {lesson.isLocked ? '🔒' : lesson.id}
                        </button>
                    ))}
                </div>
            </div>

            {/*  Info Card แสดงข้อมูลบท */}
            <div className="lesson-info-cards">
                <div className="info-card unit-card">
                    <h3 className="card-title">{currentChapter.title}</h3>
                    <p className="card-subtitle">{currentChapter.description}</p>
                    <div className="progress-info">
                        <span className="progress-text">
                            ความคืบหน้า: {Math.max(0, currentChapter.currentStage - 1)}/{currentChapter.totalStages} ด่าน
                        </span>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{width: `${(Math.max(0, currentChapter.currentStage - 1) / currentChapter.totalStages) * 100}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonGrid;