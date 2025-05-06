
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Index = () => {
  const { isOnboarded } = useAppContext();

  useEffect(() => {
    // We directly use App.tsx routing
  }, []);

  return <Navigate to={isOnboarded ? "/" : "/onboarding"} />;
};

export default Index;
