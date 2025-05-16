
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate()
  
  const handleClick=()=>{
    navigate('..')
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div onClick={handleClick} className="text-center">
        <AlertTriangle size={64} className="mx-auto text-upi-status-failed mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div 
          
          className="px-6 py-3 bg-upi-blue text-white font-medium rounded-lg hover:bg-upi-blue-dark transition-colors"
        >
          Go to Home
        </div>
      </div>
    </div>
  );
};

export default NotFound;
