
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { useAppContext } from '../../contexts/AppContext';
import { Navigate } from 'react-router-dom';

const AppLayout = () => {
  const { isOnboarded } = useAppContext();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="container max-w-md mx-auto px-4 pt-6 pb-20">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
