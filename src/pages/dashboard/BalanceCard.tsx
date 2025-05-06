
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const [showBalance, setShowBalance] = React.useState(true);
  
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
    <div className="relative bg-gradient-to-r from-upi-blue-dark to-upi-blue rounded-xl p-6 shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-white opacity-10 rounded-full"></div>
      
      <h3 className="text-white text-opacity-90 font-medium mb-2">Total Balance</h3>
      
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-white">
          {showBalance ? formatBalance(balance) : '••••••'}
        </div>
        <button onClick={toggleBalance} className="text-white text-opacity-80 hover:text-opacity-100 transition-opacity">
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
          UPI Enabled
        </span>
        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
          Verified
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
