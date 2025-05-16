
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const GlobalHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {setIsOnEnterPin} = useAppContext();

  // Don't render on the dashboard/home page
  if (isHomePage) return null;

  const handleBack = () => {
    setIsOnEnterPin(false);
    navigate("..");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-4">
      <button
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>
    </header>
  );
};

export default GlobalHeader;
