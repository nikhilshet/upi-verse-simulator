
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { Shield, LockKeyhole } from 'lucide-react';

interface EnterPinProps {
  onComplete: (pin: string) => void;
}

const EnterPin: React.FC<EnterPinProps> = ({ onComplete }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }
    
    toast({
      title: "PIN entered",
      description: "Please confirm your PIN on the next screen",
    });
    
    onComplete(pin);
  };

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
      
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <InputOTP 
            maxLength={4}
            pattern="[0-9]*"
            value={pin} 
            onChange={(value) => {
              setPin(value);
              setError('');
            }}
            render={({ slots }) => (
              <InputOTPGroup className="gap-4">
                {slots.map((slot, index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index}
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-upi-blue to-upi-blue-dark text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          disabled={pin.length !== 4}
        >
          Continue
        </Button>
        
        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Your PIN is secure and will be used for all UPI transactions.
            Never share your PIN with anyone.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EnterPin;
