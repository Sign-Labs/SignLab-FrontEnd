"use client";
import React from 'react';
import '../css/component.css'
interface NavButtonProps {
    path: string;
    currentPath: string;
    onClick: () => void;
    icon: string;
    label: string;
  }
  
  const NavButton = ({ path, currentPath, onClick, icon, label }: NavButtonProps) => {
    const isActive = currentPath === path;
    
    return (
      <button 
            onClick={onClick}
            className ="Lesson_Button"
        style={{
          backgroundColor: isActive ? "var(--boldskyblue)" : "var(--lightblue)",
          textAlign: "left" as const,
          transition: "all 0.3s ease",
          width: "100%"
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "var(--lightblue)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isActive ? "var(--boldskyblue)" : "var(--lightblue)";
        }}
      >
        {icon} {label}
      </button>
    );
  };
  
export default NavButton;