"use client"

import { ReactNode } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useRouter } from 'next/navigation';
import Navbar from './Navcomponent';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { pathname, isAtHome, isAuthPage } = useNavigation();
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
        <aside className='Nav_bar'>
        <button style={{backgroundColor:"transparent",border:"none",}} onClick={logoClickHandler}><h1 className="font_heading white">Sign Lab</h1></button>
        <nav style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            <Navbar 
            path="/lessons" 
            currentPath={pathname} 
            onClick={() => handleNavigation("/lessons")}
            icon="🏠"
            label="บทเรียน"
          />
          <Navbar 
            path="/vocabulary" 
            currentPath={pathname} 
            onClick={() => handleNavigation("/vocabulary")}
            icon="💬"
            label="คลังคำศัพท์"
            />
             <Navbar 
            path="/ranking" 
            currentPath={pathname} 
            onClick={() => handleNavigation("/ranking")}
            icon="👤"
            label="ตารางคะแนน"
            />
            <Navbar 
            path="/profile" 
            currentPath={pathname} 
            onClick={() => handleNavigation("/profile")}
            icon="👤"
            label="โปรไฟล์ของฉัน"
            />
            <button className='Lesson_Button' style={{backgroundColor:"var(--red)"}} onClick={() => handleNavigation("/")}>ลงชื่อออก</button>
        </nav>
    </aside>)}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
