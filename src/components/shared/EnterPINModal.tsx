
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import NumPad from './NumPad';
import upi from '../../assets/upi.svg'
interface EnterPINModalProps {
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
  recipient: string;

}

const EnterPINModal: React.FC<EnterPINModalProps> = ({ onSuccess, onCancel , amount , recipient }) => {
  const { user } = useAppContext();
  const [attempts, setAttempts] = React.useState(0);

  const handlePinSubmit = (pin: string) => {
    if (pin.length >=4) {
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
    <div className="w-full flex flex-col mt-16 items-center justify-between">
      <div className='w-full'>
      <div className='w-full flex justify-between'>
          <div className='px-4'>
            <p className='font-bold text-black'>{user.selectedBank.toUpperCase()} BANK</p>
            <p className='text-black'>XXXX876</p>
          </div>
          <img className='w-24' src={upi} alt="" />
        </div>
        <div className='w-full px-4 bg-gray-300 flex justify-between'>
          <div className='px-4'>
            <p className='text-black'>To:</p>
            <p className='text-black'>Sending:</p>
          </div>
          <div className=''>
            <p className='text-black'>{recipient}</p>
            <p className='text-black'>Rs.{amount}</p>
          </div>
        </div>
      </div>

      <p className='mt-32'>ENTER YOUR PIN</p>
        <NumPad
          maxLength={4}
          onComplete={handlePinSubmit}
          onCancel={onCancel}
        />

    </div>
  );
};

export default EnterPINModal;
