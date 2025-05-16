
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Contact } from '@/contexts/ContactsContext';

interface Merchant {
  id: string;
  name: string;
  upiId: string;
  image: string;
  amount?: number;
}

interface SendMoneyAmountProps {
  contact?: Contact;
  merchant?: Merchant;
  onBack: () => void;
  onConfirm: (amount: number) => void;
  initialAmount?: number;
}

const SendMoneyAmount: React.FC<SendMoneyAmountProps> = ({
  contact,
  merchant,
  onBack,
  onConfirm,
  initialAmount = 0
}) => {
  const [amount, setAmount] = useState(initialAmount ? initialAmount.toString() : '');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  
  const recipient = merchant || contact;
  
  useEffect(() => {
    if (initialAmount) {
      setAmount(initialAmount.toString());
    }
  }, [initialAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    
    if (Number(value) < 1) {
      setError('Amount must be at least ₹1');
    } else if (Number(value) > 100000) {
      setError('Amount cannot exceed ₹1,00,000');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) < 1) {
      setError('Please enter a valid amount');
      return;
    }
    
    onConfirm(Number(amount));
  };

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  return (
    <div className="relative flex flex-col justify-between pb-0">
      {/* <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="absolute top-0 left-0 p-2"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button> */}

      <div className="flex flex-col items-center pt-8 pb-4">
        {recipient && (
          <>
            <img
              src={recipient.image}
              alt={recipient.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{recipient.name}</h2>
            <p className="text-sm text-gray-500">{recipient.upiId}</p>
            
            {merchant && (
              <div className="mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <p className="text-xs text-green-800 dark:text-green-200">Merchant</p>
              </div>
            )}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="relative">
          <div className="grid grid-cols-[40%_60%] justify-center items-center">
            <span className="text-2xl justify-self-end text-center mr-2 text-black dark:text-gray-300">₹</span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="text-4xl w-full font-bold bg-transparent border-none focus:outline-none focus:ring-0"
              placeholder="0"
              inputMode="numeric"
              autoFocus={!initialAmount}
              readOnly={merchant && !!merchant.amount}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </div>

        {!merchant?.amount && (
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map(amt => (
              <Button
                key={amt}
                type="button"
                variant="outline"
                onClick={() => setAmount(amt.toString())}
                className="py-2"
              >
                ₹{amt}
              </Button>
            ))}
          </div>
        )}

        <div>
          <Input
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 border-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6 bg-gradient-to-r text-lg from-upi-blue-light to-upi-blue-dark shadow-lg shadow-cyan-500/20" 
          // bg-gradient-to-r from-bg-blue to-upi-blue-dark shadow-lg shadow-cyan-500/20
          disabled={!amount || Number(amount) < 1 || !!error}
        >
          Pay ₹{amount || '0'}
        </Button>
      </form>
    </div>
  );
};

export default SendMoneyAmount;
