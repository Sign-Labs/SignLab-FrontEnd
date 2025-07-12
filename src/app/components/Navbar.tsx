"use client"

import { ReactNode } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useRouter } from 'next/navigation';
import Navbar from './Navcomponent';
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { useState } from 'react';
import '../css/container.css';
import '../css/component.css';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { pathname, isAtHome, isAuthPage } = useNavigation();
  const [name,setname] = useState("TestClient");
  const router = useRouter();

  console.log('Current page:', pathname);
  console.log('Is at /home:', isAtHome);

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const logoClickHandler = () =>
  {
    return router.push("/");
  }
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {isAtHome && (
        <aside className='Nav_bar' style={{ display: "flex", flexDirection: "column", height: "auto" }}>
          <div>
            <h1 className="font_heading background">Sign Lab</h1>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Navbar 
                path="/lessons" 
                currentPath={pathname} 
                onClick={() => handleNavigation("/lessons")}
                icon={<GiNotebook size={25}/>}
                label="บทเรียน"
              />
              <Navbar 
                path="/vocabulary" 
                currentPath={pathname} 
                onClick={() => handleNavigation("/vocabulary")}
                icon={<FaBook size={20} />}
                label="คลังคำศัพท์"
              />
              <Navbar 
                path="/ranking" 
                currentPath={pathname} 
                onClick={() => handleNavigation("/ranking")}
                icon={<FaRankingStar size={20} />}
                label="ตารางคะแนน"
              />
              <Navbar 
                path="/profile" 
                currentPath={pathname} 
                onClick={() => handleNavigation("/profile")}
                icon={<IoPersonSharp size={20} />}
                label="โปรไฟล์ของฉัน"
              />
              <button className='Lesson_Button' style={{backgroundColor:"var(--red)"}} onClick={() => handleNavigation("/")}><h1 className = "font_description_white regular">ลงชื่อออก</h1></button>
            </nav>
          </div>
          
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "left" }}>
            <h1 className="font_description_white bold Lesson_Button_name" style={{backgroundColor:"var(--coolgray)"}} >{name}</h1>
          </div>
    </aside>)}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
