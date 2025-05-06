
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';

interface SetupPinProps {
  onComplete: (pin: string) => void;
}

const SetupPin: React.FC<SetupPinProps> = ({ onComplete }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }
    
    if (pin !== confirmPin) {
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
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Create your UPI PIN
      </h2>
      
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter 4-digit PIN
          </label>
          <Input
            type="password"
            maxLength={4}
            pattern="[0-9]*"
            inputMode="numeric"
            value={pin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setPin(value);
              setError('');
            }}
            className="bg-gray-50 dark:bg-gray-700"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm your PIN
          </label>
          <Input
            type="password"
            maxLength={4}
            pattern="[0-9]*"
            inputMode="numeric"
            value={confirmPin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setConfirmPin(value);
              setError('');
            }}
            className="bg-gray-50 dark:bg-gray-700"
            required
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-upi-green hover:bg-upi-green-dark text-white"
        >
          Set PIN
        </Button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Your PIN is secure and will be used for all UPI transactions.
          Never share your PIN with anyone.
        </p>
      </form>
    </div>
  );
};

export default SetupPin;
