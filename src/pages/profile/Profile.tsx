
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Moon, Sun, Key, LogOut } from 'lucide-react';
import { Switch } from '../../components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, darkMode, setDarkMode, setIsOnboarded } = useAppContext();
  const navigate = useNavigate();
  
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light mode activated" : "Dark mode activated",
      description: "Your display preference has been updated",
    });
  };
  
  const handleResetPIN = () => {
    navigate('/onboarding', { state: { resetPin: true } });
    toast({
      title: "PIN reset initiated",
      description: "Follow the steps to set a new UPI PIN",
    });
  };
  
  const handleLogout = () => {
    setIsOnboarded(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-upi-blue to-upi-blue-light flex items-center justify-center text-white text-xl font-bold mr-4">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user?.name || 'User'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.phone || ''}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-3">
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />
        </div>
        
        <button 
          className="w-full p-4 border-b border-gray-100 dark:border-gray-700 flex items-center text-left"
          onClick={handleResetPIN}
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-3">
            <Key size={20} />
          </div>
          <span>Reset UPI PIN</span>
        </button>
        
        <button 
          className="w-full p-4 flex items-center text-left text-red-500"
          onClick={handleLogout}
        >
          <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-20 rounded-full p-2 mr-3">
            <LogOut size={20} className="text-red-500" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
