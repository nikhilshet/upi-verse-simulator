
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import NumPad from '@/components/shared/NumPad';
import { useAppContext } from '@/contexts/AppContext';
import upi from '../../assets/upi.svg'
interface ConfirmPinProps {
  originalPin: string;
  onComplete: (pin: string) => void;
  onBack: () => void;
}

const ConfirmPin: React.FC<ConfirmPinProps> = ({ originalPin, onComplete, onBack }) => {
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState('');
  const {user , setUser} = useAppContext()

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
    <div className="h-screen flex flex-col items-center justify-between">
          <div className='w-full mt-10 flex justify-between'>
        <div className='px-4'>
          <p className='font-bold'>{user.selectedBank.toUpperCase()} BANK</p>
        <p>XXXX876</p>
        </div>
        
        <img className='w-24' src={upi} alt="" />
      </div>
      <div className='mt-32'>
              <p>RE-ENTER 4-DIGIT UPI PIN</p>
            </div>
     
      
      <NumPad
        maxLength={4}
        onComplete={handlePinSubmit}
      />
      

      
      {/* <Button 
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full rounded-xl border-gray-300 dark:border-gray-600 py-6 mt-6"
      >
        Back
      </Button> */}

    </div>
  );
};

export default ConfirmPin;
