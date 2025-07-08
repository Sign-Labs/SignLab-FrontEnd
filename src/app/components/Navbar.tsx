'use client'

import { ReactNode } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useRouter } from 'next/navigation';

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
            <button 
              onClick={() => handleNavigation("/lessons")}
              style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"#3498db",
                display:"flex",
                alignItems:"center",
                gap:"10px",
                border:"none",
                cursor:"pointer",
                textAlign:"left"
            }}>
                🏠 บทเรียน
            </button>
            <button 
              onClick={() => handleNavigation("/vocabulary")}
              style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px",
                border:"none",
                cursor:"pointer",
                textAlign:"left"
            }}>
                💬 คำศัพท์
            </button>
            <button 
              onClick={() => handleNavigation("/leaderboard")}
              style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px",
                border:"none",
                cursor:"pointer",
                textAlign:"left"
            }}>
                � ตารางคะแนน
            </button>
            <button 
              onClick={() => handleNavigation("/profile")}
              style={{
                color:"white", 
                textDecoration:"none", 
                padding:"12px 15px", 
                borderRadius:"8px", 
                backgroundColor:"rgba(255,255,255,0.1)",
                display:"flex",
                alignItems:"center",
                gap:"10px",
                border:"none",
                cursor:"pointer",
                textAlign:"left"
            }}>
                👤 โปรไฟล์
            </button>
        </nav>
    </aside>)}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
