
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { Shield } from 'lucide-react';

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
      <div className="mb-6">
        <div className="w-16 h-16 bg-upi-blue/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Shield className="h-8 w-8 text-upi-blue" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
          Create your UPI PIN
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
          Enter a 4-digit PIN for secure transactions
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
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
                    {...slot} 
                    className="w-14 h-16 text-2xl border-gray-300 dark:border-gray-600"
                    index={index}
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-upi-green hover:bg-upi-green-dark text-white"
          disabled={pin.length !== 4}
        >
          Continue
        </Button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Your PIN is secure and will be used for all UPI transactions.
          Never share your PIN with anyone.
        </p>
      </form>
    </div>
  );
};

export default EnterPin;
