
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { Shield, ShieldCheck } from 'lucide-react';

interface ConfirmPinProps {
  originalPin: string;
  onComplete: (pin: string) => void;
  onBack: () => void;
}

const ConfirmPin: React.FC<ConfirmPinProps> = ({ originalPin, onComplete, onBack }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      setIsMatching(pin === originalPin);
      if (pin !== originalPin) {
        setError('PINs do not match. Please try again.');
      } else {
        setError('');
      }
    }
  }, [pin, originalPin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }
    
    if (pin !== originalPin) {
      setError('PINs do not match');
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
      <div className="mb-6">
        <div className="w-16 h-16 bg-upi-blue/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          {isMatching && pin.length === 4 ? 
            <ShieldCheck className="h-8 w-8 text-upi-green" /> : 
            <Shield className="h-8 w-8 text-upi-blue" />
          }
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
          Confirm your UPI PIN
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
          Re-enter the same PIN to confirm
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
              if (value.length < 4) {
                setError('');
              }
            }}
            render={({ slots }) => (
              <InputOTPGroup className="gap-4">
                {slots.map((slot, index) => (
                  <InputOTPSlot 
                    key={index} 
                    {...slot} 
                    className={`w-14 h-16 text-2xl border-gray-300 dark:border-gray-600 ${
                      isMatching && pin.length === 4 ? 'border-green-500 dark:border-green-500' : ''
                    }`}
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
        
        <div className="flex flex-col space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-upi-green hover:bg-upi-green-dark text-white"
            disabled={pin.length !== 4 || pin !== originalPin}
          >
            Set PIN
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Back
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Your PIN is secure and will be used for all UPI transactions.
          Never share your PIN with anyone.
        </p>
      </form>
    </div>
  );
};

export default ConfirmPin;
