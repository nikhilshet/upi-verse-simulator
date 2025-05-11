
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import NumPad from './NumPad';

interface EnterPINModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const EnterPINModal: React.FC<EnterPINModalProps> = ({ onSuccess, onCancel }) => {
  const { user } = useAppContext();
  const [attempts, setAttempts] = React.useState(0);

  const handlePinSubmit = (pin: string) => {
    if (pin === user?.upiPin) {
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts >= 2) {
        toast({
          title: "Too many incorrect attempts",
          description: "Please try again after some time.",
          variant: "destructive",
        });
        onCancel();
      } else {
        toast({
          title: "Incorrect PIN",
          description: `${3 - attempts} attempts remaining.`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="relative pb-6 pt-6">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-upi-blue to-upi-blue-dark rounded-full flex items-center justify-center mb-6 shadow-lg">
          <ShieldCheck className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Enter UPI PIN</h2>
        <p className="text-sm text-gray-500 mb-8">Enter your 4-digit UPI PIN to authorize this transaction</p>
        
        <NumPad
          maxLength={4}
          onComplete={handlePinSubmit}
          onCancel={onCancel}
        />
        
        <button className="mt-6 text-sm text-upi-blue" onClick={() => toast({ title: "Coming soon", description: "This feature is not implemented yet" })}>
          Forgot UPI PIN?
        </button>
      </div>
    </div>
  );
};

export default EnterPINModal;
