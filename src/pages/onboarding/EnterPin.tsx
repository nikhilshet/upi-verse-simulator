
import React from 'react';
import { LockKeyhole } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import NumPad from '@/components/shared/NumPad';

interface EnterPinProps {
  onComplete: (pin: string) => void;
}

const EnterPin: React.FC<EnterPinProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-upi-blue to-upi-blue-dark/70 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
          <LockKeyhole className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Create your UPI PIN
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          Enter a 4-digit PIN for secure transactions
        </p>
      </div>
      
      <NumPad
        maxLength={4}
        onComplete={(pin) => {
          toast({
            title: "PIN entered",
            description: "Please confirm your PIN on the next screen",
          });
          onComplete(pin);
        }}
      />
      
      <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 mt-10">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Your PIN is secure and will be used for all UPI transactions.
          Never share your PIN with anyone.
        </p>
      </div>
    </div>
  );
};

export default EnterPin;
