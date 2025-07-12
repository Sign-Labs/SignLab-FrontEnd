"use client";
import React from 'react';
import { useState } from 'react';
import '../css/component.css'
import '../css/lessons.css'

interface NavButtonProps {
    path: string;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }
  
const genlessons = ({ path, onClick, icon, label }: NavButtonProps) => {
    const [show,setshow] = useState(false);
    const handleclick = ()=>
    {
      setshow(!show);
      onClick();
    }
      return (
        <div className = "main_container">
          <button onClick={onClick} className="lesson_bar" onClickCapture={() => handleclick()}>
                {icon} <h1 className ="font_main bold lesson_text">{label}</h1>
          </button>
        </div>
    );
  };
  
export default genlessons;