
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { useAppContext } from '../../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';

const AppLayout = () => {
  const { isOnboarded, darkMode } = useAppContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
      <GlobalHeader />
      <div className={`container max-w-md mx-auto px-4 ${isHomePage ? 'pt-6' : 'pt-20'} pb-20 relative`}>
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
