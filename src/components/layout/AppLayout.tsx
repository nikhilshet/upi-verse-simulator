
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { useAppContext } from '../../contexts/AppContext';
import { Navigate } from 'react-router-dom';

const AppLayout = () => {
  const { isOnboarded, darkMode } = useAppContext();

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isOnboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pb-16 transition-colors`}>
      <div className="container max-w-md mx-auto px-4 pt-6 pb-20">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
