
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="absolute top-0 left-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
      aria-label="Back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};
