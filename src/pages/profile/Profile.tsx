
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { User, Moon, Sun, Key, LogOut , Pencil} from 'lucide-react';
import { Switch } from '../../components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import EditProfile from './EditProfile';



const Profile = () => {
  interface User {
    name: string;
    phone: string;
    email: string;
    selectedSim: string;
    selectedBank: string;
    upiPin: string;
    balance: number;
    editable : boolean;
  }
  
  const { user,setUser, darkMode, setDarkMode, setIsOnboarded } = useAppContext();
  const navigate = useNavigate();
  
  const handleToggleDarkMode = () => {
    const newDarkModeValue = !darkMode;
    setDarkMode(newDarkModeValue);
    toast({
      title: newDarkModeValue ? "Dark mode activated" : "Light mode activated",
      description: "Your display preference has been updated",
    });
  };
  
  const handleResetPIN = () => {
    toast({
      title: "PIN reset initiated",
      description: "Follow the steps to set a new UPI PIN",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  const handleEdit=()=>{
    setUser({...user , editable : !user.editable})
  }

  if(user.editable){
    return(
      <EditProfile/>
    )
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-upi-blue to-upi-blue-light flex items-center justify-center text-white text-xl font-bold mr-4">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className=' w-36'>
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
          <div className='ml-auto'>
          <Pencil onClick={handleEdit} className='text-gray-600 dark:text-white' />
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-3">
              {darkMode ? <Moon size={20} className="text-white" /> : <Sun size={20} />}
            </div>
            <span className="text-gray-800 dark:text-white">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />
        </div>
        
        <button 
          className="w-full p-4 border-b border-gray-100 dark:border-gray-700 flex items-center text-left text-gray-800 dark:text-white"
          onClick={handleResetPIN}
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-3">
            <Key size={20} className="text-gray-600 dark:text-gray-300" />
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
