"use client";
import React, { useState, useEffect } from 'react';
import '../css/lessons.css';

interface LessonData {
    id: number;
    isCompleted: boolean;
    isActive: boolean;
    isLocked: boolean;
}

interface UserProgress {
    lastCompletedChapter: number;
    lastCompletedStage: number;
}

interface LessonGridProps {
    chapterNumber: number;
    onStageClick?: (stageId: number) => void;
    userProgress?: UserProgress; // ← รับข้อมูลจาก props (จาก API)
}

const LessonGrid = ({ 
    chapterNumber = 1,
    onStageClick,
    userProgress = { lastCompletedChapter: 4, lastCompletedStage: 6 } // ← ค่าเริ่มต้น
}: LessonGridProps) => {

    // ข้อมูลบทเรียน (สำหรับ API ในอนาคต)
    const chaptersData = {
        1: { title: "การทักทายแนะนำ", description: "การทักทายพื้นฐาน", totalStages: 5 },
        2: { title: "ตัวเลข", description: "ตัวเลขในภาษาไทย", totalStages: 5 },
        3: { title: "พยัญชนะ", description: "พยัญชนะในภาษาไทย", totalStages: 5 },
        4: { title: "สระ วรรณยุกต์", description: "สระ วรรณยุกต์ในภาษาไทย", totalStages: 5 },
        5: { title: "วันและเวลา", description: "วันและเวลาในภาษาไทย", totalStages: 5 }
    };

    // ← ฟังก์ชันคำนวณด่านปัจจุบันของบทนี้
    const getCurrentStageForChapter = (chapterNum: number): number => {
        const { lastCompletedChapter, lastCompletedStage } = userProgress;
        
        if (chapterNum < lastCompletedChapter) {
            // บทที่เสร็จไปแล้ว -> แสดงเสร็จครบ (6)
            return 6;
        } 
        else if (chapterNum === lastCompletedChapter) {
            // บทที่เสร็จล่าสุด -> เช็คว่าเสร็จครบหรือยัง
            const totalStages = chaptersData[chapterNum as keyof typeof chaptersData]?.totalStages || 5;
            if (lastCompletedStage >= totalStages) {
                return 6; // เสร็จครบแล้ว
            } else {
                return lastCompletedStage + 1; // ด่านถัดไป
            }
        }
        else if (chapterNum === lastCompletedChapter + 1) {
            // บทถัดไปที่เปิดให้เล่น -> เช็คว่าบทก่อนหน้าเสร็จครบหรือไม่
            const previousChapterTotalStages = chaptersData[lastCompletedChapter as keyof typeof chaptersData]?.totalStages || 5;
            
            if (lastCompletedStage >= previousChapterTotalStages) {
                return 1; // เริ่มด่าน 1 ของบทใหม่
            } else {
                return 0; // บทก่อนหน้ายังไม่เสร็จ จึงยังล็อค
            }
        }
        else {
            // บทที่ยังไม่เปิด -> ล็อค
            return 0;
        }
    };

    // ← ฟังก์ชันเช็คว่าบทเปิดแล้วหรือไม่
    const isChapterUnlocked = (chapterNum: number): boolean => {
        return chapterNum <= userProgress.lastCompletedChapter + 1;
    };

    // ← ฟังก์ชันคำนวณจำนวนด่านที่เสร็จแล้ว
    const getCompletedStagesCount = (chapterNum: number): number => {
        const { lastCompletedChapter, lastCompletedStage } = userProgress;
        const totalStages = chaptersData[chapterNum as keyof typeof chaptersData]?.totalStages || 5;
        
        if (chapterNum < lastCompletedChapter) {
            // บทที่เสร็จไปแล้ว -> เสร็จครบ
            return totalStages;
        } 
        else if (chapterNum === lastCompletedChapter) {
            // บทที่เสร็จล่าสุด -> ใช้ lastCompletedStage
            return Math.min(lastCompletedStage, totalStages);
        }
        else if (chapterNum === lastCompletedChapter + 1) {
            // บทถัดไป
            const previousChapterTotalStages = chaptersData[lastCompletedChapter as keyof typeof chaptersData]?.totalStages || 5;
            
            if (lastCompletedStage >= previousChapterTotalStages) {
                return 0; // เพิ่งเปิดบทใหม่ ยังไม่ได้เสร็จด่านไหน
            } else {
                return 0; // บทยังล็อค
            }
        }
        else {
            // บทที่ยังไม่เปิด
            return 0;
        }
    };

    // ← สร้างข้อมูลบทปัจจุบัน
    const getCurrentChapterInfo = () => {
        const chapterData = chaptersData[chapterNumber as keyof typeof chaptersData];
        return {
            title: chapterData?.title || "บทเรียนใหม่",
            description: chapterData?.description || "เตรียมตัวสำหรับการเรียนรู้",
            totalStages: chapterData?.totalStages || 5,
            currentStage: getCurrentStageForChapter(chapterNumber)
        };
    };

    const currentChapter = getCurrentChapterInfo();

    // ← ฟังก์ชันสร้างสถานะด่าน
    const generateLessons = (): LessonData[] => {
        const lessons: LessonData[] = [];
        const currentStageForThisChapter = getCurrentStageForChapter(chapterNumber);
        const isUnlocked = isChapterUnlocked(chapterNumber);
        
        for (let i = 1; i <= currentChapter.totalStages; i++) {
            if (!isUnlocked || currentStageForThisChapter === 0) {
                // บทไม่เปิดหรือล็อค -> ทุกด่านล็อค
                lessons.push({
                    id: i,
                    isCompleted: false,
                    isActive: false,
                    isLocked: true
                });
            } else {
                // บทเปิดแล้ว
                lessons.push({
                    id: i,
                    isCompleted: i < currentStageForThisChapter,  // ด่านที่ผ่านแล้ว
                    isActive: i === currentStageForThisChapter,   // ด่านปัจจุบัน
                    isLocked: i > currentStageForThisChapter      // ด่านที่ล็อค
                });
            }
        }
        
        return lessons;
    };

    const lessons = generateLessons();

    // ← เช็คว่าบทเสร็จครบแล้วหรือไม่
    const isChapterFullyCompleted = (): boolean => {
        return getCurrentStageForChapter(chapterNumber) > currentChapter.totalStages;
    };

    const handleLessonClick = (lessonId: number) => {
        const lesson = lessons.find(l => l.id === lessonId);
        
        if (!isChapterUnlocked(chapterNumber)) {
            alert(`ยังไม่สามารถเข้าบทนี้ได้! ทำบทก่อนหน้าให้เสร็จก่อน`);
            return;
        }
        
        if (lesson?.isLocked) {
            if (isChapterFullyCompleted()) {
                console.log(`บทที่ ${chapterNumber} เสร็จสิ้นแล้ว`);
                return;
            }
            
            alert(`ยังไม่สามารถเข้าด่านนี้ได้! ทำด่าน ${getCurrentStageForChapter(chapterNumber)} ให้เสร็จก่อน`);
            return;
        }

        console.log(`เริ่มบทที่ ${chapterNumber}: ${currentChapter.title} - ด่านที่ ${lessonId}`);
        
        if (onStageClick) {
            onStageClick(lessonId);
        }
    };

    return (
        <div className="lesson-grid-container">
            {/* Grid แสดงด่าน */}
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

            {/* Info Card */}
           <div className="lesson-info-cards">
    <div className="info-card ranking-card">
        <h3 className="card-title">{currentChapter.title}</h3>
        <p className="card-subtitle">{currentChapter.description}</p>
        <div className="progress-info">
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{
                        width: `${(getCompletedStagesCount(chapterNumber) / currentChapter.totalStages) * 100}%`,
                        backgroundColor: "#FF9500" // ← เปลี่ยนเป็นสีส้ม
                    }}
                ></div>
            </div>
        </div>
    </div>
</div>

        </div>
    );
};

export default LessonGrid;