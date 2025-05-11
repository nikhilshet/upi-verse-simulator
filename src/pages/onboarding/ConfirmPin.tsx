
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import NumPad from '@/components/shared/NumPad';

interface ConfirmPinProps {
  originalPin: string;
  onComplete: (pin: string) => void;
  onBack: () => void;
}

const ConfirmPin: React.FC<ConfirmPinProps> = ({ originalPin, onComplete, onBack }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');

  const handlePinSubmit = (pin: string) => {
    if (pin !== originalPin) {
      setError('PINs do not match');
      toast({
        title: "PINs don't match",
        description: "Please try again",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "PIN setup successful",
      description: "Your UPI PIN has been set up successfully",
    });
    
    onComplete(pin);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg transition-all duration-300 ${
          isMatching
            ? "bg-gradient-to-br from-upi-green to-upi-green-dark/70"
            : "bg-gradient-to-br from-upi-blue to-upi-blue-dark/70"
        }`}>
          {isMatching ? 
            <ShieldCheck className="h-10 w-10 text-white" /> : 
            <LockKeyhole className="h-10 w-10 text-white" />
          }
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Confirm your UPI PIN
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          Re-enter the same PIN to confirm
        </p>
      </div>
      
      <NumPad
        maxLength={4}
        onComplete={handlePinSubmit}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-4 animate-fade-in">{error}</p>
      )}
      
      <Button 
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full rounded-xl border-gray-300 dark:border-gray-600 py-6 mt-6"
      >
        Back
      </Button>
      
      <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 mt-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Your PIN is secure and will be used for all UPI transactions.
          Never share your PIN with anyone.
        </p>
      </div>
    </div>
  );
};

export default ConfirmPin;
