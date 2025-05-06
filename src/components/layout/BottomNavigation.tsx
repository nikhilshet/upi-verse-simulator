
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, QrCode, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { id: 1, name: 'Home', path: '/', icon: Home },
    { id: 2, name: 'History', path: '/history', icon: History },
    { id: 3, name: 'Scan QR', path: '/scan-qr', icon: QrCode },
    { id: 4, name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 h-16 flex items-center justify-around z-10">
      {navItems.map((item) => {
        const isActive = path === item.path;
        return (
          <Link 
            key={item.id} 
            to={item.path} 
            className={`flex flex-col items-center justify-center w-1/4 h-full ${
              isActive ? 'text-upi-blue dark:text-upi-blue-light' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? 'text-upi-blue dark:text-upi-blue-light' : ''}`} />
            <span className="text-xs mt-1 font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
