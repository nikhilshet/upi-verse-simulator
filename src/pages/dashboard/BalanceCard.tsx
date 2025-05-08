
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const [showBalance, setShowBalance] = React.useState(true);
  const { darkMode } = useAppContext();
  
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="balance-card relative p-6 overflow-hidden animate-fade-in bg-red-300">
      <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-white opacity-10 rounded-full"></div>
      
      <h3 className="text-sm font-medium text-white/90 mb-2">Total Balance</h3>
      
      <div className="flex items-center space-x-2">
        <div className="text-3xl font-bold text-white">
          {showBalance ? formatBalance(balance) : '••••••'}
        </div>
        <button onClick={toggleBalance} className="text-white/80 hover:text-white transition-opacity">
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white backdrop-blur-sm">
          UPI Enabled
        </span>
        <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white backdrop-blur-sm">
          Verified
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
