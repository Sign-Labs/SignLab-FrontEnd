'use client'

import { usePathname } from 'next/navigation';

export const useNavigation = () => {
  const pathname = usePathname();

    const isAtHome = () => {
        if (pathname === '/lessons' || pathname === '/profile' || pathname === '/leaderboard' || pathname === '/vocabulary' || pathname === '/ranking' ) {
            return true;
        }
        else
        {
            return false;
        }
  };

  const isAuthPage = () => {
    const authPages = ['/login', '/register', '/forgot', '/otp'];
    return authPages.includes(pathname);
  };

  return {
    pathname,
    isAtHome: isAtHome(),
    isAuthPage: isAuthPage(),
  };
};
