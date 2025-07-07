'use client'

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // เช็คว่าอยู่หน้าไหน
  const shouldShowNavbar = () => {
    const authPages = ['/login', '/register', '/forgot', '/otp'];
    return !authPages.includes(pathname);
  };

  console.log('Current page:', pathname);

  return (
    <div>
      {shouldShowNavbar() && (
        <nav style={{
          backgroundColor: '#2c3e50',
          padding: '10px 20px',
          color: 'white'
        }}>
          <span>Current page: {pathname}</span>
        </nav>
      )}
      {children}
    </div>
  );
}
