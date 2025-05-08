
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useReward } from 'react-rewards';

interface PaymentSuccessProps {
  amount: number;
  recipient: string;
  onDone: () => void;
}

// function shot(){
//   confetti();
// }
// useEffect(()=>{
//   confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { x: 0.5, y: 0.5 }, // center of screen
//   });
// },[])
const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ amount, recipient, onDone }) => {
  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };
  const { reward, isAnimating } = useReward('rewardId', 'confetti' , {fps:60});
  const [transactionId , setTransactionId] = useState('');
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  

  useEffect(()=>{
    reward()
    setTransactionId(`UPI${Math.floor(Math.random() * 1000000000)}`)
  },[])

  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />

      </div>
      <div className='flex flex-col justify-center items-center'> 
      <h2 className="text-2xl font-bold mb-1">Payment Successful!</h2>
      <p className="text-gray-500 mb-2">Your transaction has been completed</p>
      <div  id='rewardId' className='margin-auto'></div>
      <p className="text-4xl font-bold mb-6">{formatAmount(amount)}</p>
      </div>
     
      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col space-y-4">
          
          <div className="flex flex-col">
            <span className="text-gray-500">To</span>
            <span className="font-medium">{recipient}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500">Date</span>
            <span>{currentDate}</span>
          </div>
          
          <div className="flex flex-col ">
            <span className="text-gray-500">Transaction ID</span>
            <span className="text-medium">{transactionId}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onDone}
        variant='glow'
        className="w-full text-lg font-medium text-white font-medium py-6 rounded-xl"
      >
        Done
      </Button>
    </div>
  );
};

export default PaymentSuccess;
