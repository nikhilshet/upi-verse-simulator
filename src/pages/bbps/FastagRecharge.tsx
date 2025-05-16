
import React, { useState } from 'react';
import { ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
import { useAppContext } from '@/contexts/AppContext';

enum Step {
  FORM = 'form',
  ENTER_PIN = 'enter-pin',
  PROCESSING = 'processing',
  SUCCESS = 'success'
}

const FastagRecharge = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState({
    vehicleNumber: '',
    amount: ''
  });
  
  const [currentStep, setCurrentStep] = useState<Step>(Step.FORM);
      const {isOnEnterPin , setIsOnEnterPin} = useAppContext()
  
  const validateVehicleNumber = (value: string) => {
    // Format: AA11AA1111 (e.g., MH12AB1234)
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return regex.test(value);
  };

  const handleVehicleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVehicleNumber(value);
    
    if (value && !validateVehicleNumber(value)) {
      setError(prev => ({ ...prev, vehicleNumber: 'Please enter a valid vehicle number' }));
    } else {
      setError(prev => ({ ...prev, vehicleNumber: '' }));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    
    if (Number(value) < 100) {
      setError(prev => ({ ...prev, amount: 'Minimum amount is ₹100' }));
    } else if (Number(value) > 10000) {
      setError(prev => ({ ...prev, amount: 'Maximum amount is ₹10,000' }));
    } else {
      setError(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleNumber) {
      setError(prev => ({ ...prev, vehicleNumber: 'Vehicle number is required' }));
      return;
    }
    
    if (!validateVehicleNumber(vehicleNumber)) {
      setError(prev => ({ ...prev, vehicleNumber: 'Please enter a valid vehicle number' }));
      return;
    }
    
    if (!amount || Number(amount) < 100) {
      setError(prev => ({ ...prev, amount: 'Please enter a valid amount (min ₹100)' }));
      return;
    }
    
    setCurrentStep(Step.ENTER_PIN);
  };

  const handlePinSuccess = () => {
    setCurrentStep(Step.PROCESSING);
    
    // Simulate processing delay
    setTimeout(() => {
      setCurrentStep(Step.SUCCESS);
    }, 4000);
  };

  const handleDone = () => {
    setVehicleNumber('');
    setAmount('');
    setCurrentStep(Step.FORM);
  };

  if(currentStep === Step.ENTER_PIN){
    setIsOnEnterPin(true)
  }else{
    setIsOnEnterPin(false)

  }

  if (currentStep === Step.ENTER_PIN) {
    return (
      <EnterPINModal 
        onSuccess={handlePinSuccess}
        onCancel={() => setCurrentStep(Step.FORM)}
        amount={Number(amount)}
        recipient='FastTag'
      />
    );
  }

  if (currentStep === Step.PROCESSING) {
    return <PaymentProcessing amount={Number(amount)} recipient="Fast Tag"/>;
  }

  if (currentStep === Step.SUCCESS) {
    return (
      <PaymentSuccess
        amount={Number(amount)}
        recipient="Fastag Recharge"
        onDone={handleDone}
      />
    );
  }

  return (
    <div className="pt-6">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6 mt-6">FASTag Recharge</h1>
      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
            <Car className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">FASTag Recharge</h2>
            <p className="text-sm text-gray-500">NPCI FASTag Service</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="vehicleNumber" className="text-sm font-medium">
              Vehicle Number
            </label>
            <Input
              id="vehicleNumber"
              placeholder="Enter vehicle number"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              className={error.vehicleNumber ? "border-red-500" : ""}
            />
            <p className="text-xs text-gray-400">e.g., MH12AB1234</p>
            {error.vehicleNumber && (
              <p className="text-red-500 text-xs">{error.vehicleNumber}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Recharge Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                className={`pl-8 ${error.amount ? "border-red-500" : ""}`}
              />
            </div>
            {error.amount && (
              <p className="text-red-500 text-xs">{error.amount}</p>
            )}
          </div>
          
          <Button
            variant='glow'
            type="submit"
            className="w-full py-6 text-white"
            disabled={
              !vehicleNumber || 
              !amount || 
              !!error.vehicleNumber || 
              !!error.amount
            }
          >
            Proceed to Pay
          </Button>
        </form>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h3 className="font-medium mb-2">About FASTag</h3>
        <p className="text-sm text-gray-500">
          FASTag is an electronic toll collection system in India, operated by the National Highway Authority of India. It employs Radio Frequency Identification (RFID) technology for making toll payments directly from the prepaid account linked to it.
        </p>
      </div>
    </div>
  );
};

export default FastagRecharge;
