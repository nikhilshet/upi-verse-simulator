
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

interface EnterPINModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const EnterPINModal: React.FC<EnterPINModalProps> = ({ onSuccess, onCancel }) => {
  const { user } = useAppContext();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handlePinChange = (value: string) => {
    setPin(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('Please enter your 4-digit UPI PIN');
      return;
    }
    
    if (pin === user?.upiPin) {
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect PIN. ${3 - attempts} attempts remaining.`);
      setPin('');
      
      if (attempts >= 2) {
        toast({
          title: "Too many incorrect attempts",
          description: "Please try again after some time.",
          variant: "destructive",
        });
        onCancel();
      }
    }
  };

  return (
    <div className="relative pb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onCancel}
        className="absolute top-0 left-0 p-2"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div className="flex flex-col items-center pt-10">
        <div className="w-20 h-20 bg-gradient-to-br from-upi-blue to-upi-blue-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
          <ShieldCheck className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Enter UPI PIN</h2>
        <p className="text-sm text-gray-500 mb-8">Enter your 4-digit UPI PIN to authorize this transaction</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <InputOTP 
              maxLength={4}
              pattern="[0-9]*"
              value={pin} 
              onChange={handlePinChange}
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
              <p className="text-red-500 text-sm animate-fade-in">{error}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-upi-blue to-upi-blue-dark text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            disabled={pin.length !== 4}
          >
            Confirm
          </Button>
        </form>
        
        <button className="mt-6 text-sm text-upi-blue">
          Forgot UPI PIN?
        </button>
      </div>
    </div>
  );
};

export default EnterPINModal;
