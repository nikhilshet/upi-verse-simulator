
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  amount: number;
  recipient: string;
  onDone: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ amount, recipient, onDone }) => {
  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };
  
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const transactionId = `UPI${Math.floor(Math.random() * 1000000000)}`;
  
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
      
      <h2 className="text-2xl font-bold mb-1">Payment Successful!</h2>
      <p className="text-gray-500 mb-6">Your transaction has been completed</p>
      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
            <span className="text-gray-500">Amount</span>
            <span className="text-xl font-bold">{formatAmount(amount)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">To</span>
            <span className="font-medium">{recipient}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Date</span>
            <span>{currentDate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Transaction ID</span>
            <span className="text-xs">{transactionId}</span>
          </div>
        </div>
      </div>
      
      <Button
        onClick={onDone}
        className="w-full bg-gradient-to-r from-upi-blue to-upi-blue-dark text-white font-medium py-6 rounded-xl"
      >
        Done
      </Button>
    </div>
  );
};

export default PaymentSuccess;
