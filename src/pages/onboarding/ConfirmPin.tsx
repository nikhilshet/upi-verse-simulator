
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { ShieldCheck, LockKeyhole } from 'lucide-react';

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
      <div className="mb-8">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg transition-all duration-300 ${
          isMatching && pin.length === 4
            ? "bg-gradient-to-br from-upi-green to-upi-green-dark/70"
            : "bg-gradient-to-br from-upi-blue to-upi-blue-dark/70"
        }`}>
          {isMatching && pin.length === 4 ? 
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
      
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="flex flex-col items-center space-y-6">
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
                    index={index}
                    className={`${
                      isMatching && pin.length === 4 ? 'border-upi-green ring-upi-green/30' : ''
                    }`}
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{error}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button 
            type="submit" 
            className={`w-full font-medium py-6 rounded-xl shadow-md hover:shadow-lg transition-all ${
              isMatching && pin.length === 4
                ? "bg-gradient-to-r from-upi-green to-upi-green-dark text-white"
                : "bg-gradient-to-r from-upi-blue to-upi-blue-dark text-white"
            }`}
            disabled={pin.length !== 4 || pin !== originalPin}
          >
            Set PIN
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full rounded-xl border-gray-300 dark:border-gray-600 py-6"
          >
            Back
          </Button>
        </div>
        
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

export default ConfirmPin;
