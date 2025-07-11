"use client";
import React from 'react';
import '../css/lessons.css';

interface LessonData {
    id: number;
    isCompleted: boolean;
    isActive: boolean;
    isLocked: boolean;
}

interface LessonGridProps {
    chapterNumber: number;     // บทที่แสดง (1-6)
    currentStage: number;      // ด่านปัจจุบันที่เข้าได้ (1-6)
    totalStages?: number;      // จำนวนด่านทั้งหมด (default: 6)
    onStageClick?: (stageId: number) => void;
}

const LessonGrid = ({ 
    chapterNumber = 1, 
    currentStage = 1, 
    totalStages = 5,
    onStageClick 
}: LessonGridProps) => {

    
    const generateLessons = (): LessonData[] => {
        const lessons: LessonData[] = [];
        
        for (let i = 1; i <= totalStages; i++) {
            lessons.push({
                id: i,
                isCompleted: i < currentStage,  // ด่านที่ผ่านแล้ว
                isActive: i === currentStage,   // ด่านปัจจุบัน
                isLocked: i > currentStage      // ด่านที่ยังล็อค
            });
        }
        
        return lessons;
    };

    const lessons = generateLessons();

    const handleLessonClick = (lessonId: number) => {
        const lesson = lessons.find(l => l.id === lessonId);
        
        if (lesson?.isLocked) {
            alert('ด่านนี้ยังไม่เปิดใช้งาน!');
            return;
        }

        console.log(`เริ่มบทที่ ${chapterNumber} ด่านที่ ${lessonId}`);
        
        if (onStageClick) {
            onStageClick(lessonId);
        }
    };

    return (
        <div className="lesson-grid-container">
            {/* ✅ Grid แสดงด่าน */}
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

            {/* ✅ Info Card แสดงข้อมูลบท */}
            <div className="lesson-info-cards">
                <div className="info-card unit-card">
                    <h3 className="card-title">บทเรียนที่ {chapterNumber}</h3>
                    <p className="card-subtitle">หน่วยที่ {currentStage} / {totalStages}</p>
                </div>
            </div>
        </div>
    );
};

export default LessonGrid;