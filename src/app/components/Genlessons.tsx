"use client";
import React from 'react';
import '../css/component.css'
interface NavButtonProps {
    path: string;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }
  
  const genlessons = ({ path, onClick, icon, label }: NavButtonProps) => {
      return (
        <div>
            <button onClick={onClick} className ="lesson_bar">
                {icon} <h1 className ="font_description_white bold">{label}</h1>
            </button>
        </div>
    );
  };
  
export default genlessons;