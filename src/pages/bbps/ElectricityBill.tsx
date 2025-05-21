
import React, { useState } from 'react';
import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/ui/back-button';
import { Card, CardContent } from '@/components/ui/card';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
import { useAppContext } from '@/contexts/AppContext';
import adani from '../../assets/Adani Power.svg'
import tata from '../../assets/tata.svg'
import mseb from '../../assets/mseb.svg'
import reliance from '../../assets/reliance.svg'

enum Step {
  VIEW_BILLS = 'view-bills',
  ENTER_PIN = 'enter-pin',
  PROCESSING = 'processing',
  SUCCESS = 'success'
}

interface ElectricityProvider {
  id: string;
  name: string;
  logo: string;
}

interface ElectricityBill {
  id: string;
  provider: ElectricityProvider;
  consumerNumber: string;
  amount: number;
  dueDate: string;
}

const ElectricityBill = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.VIEW_BILLS);
    const {isOnEnterPin , setIsOnEnterPin} = useAppContext()
  
  const electricityProviders: ElectricityProvider[] = [
    { id: 'tata', name: 'Tata Power', logo: tata },
    { id: 'reliance', name: 'Reliance Energy', logo: reliance },
    { id: 'adani', name: 'Adani Electricity', logo: adani},
    { id: 'mseb', name: 'MSEB', logo: mseb },
  ];

  const pendingBill: ElectricityBill = {
    id: 'bill123',
    provider: electricityProviders[0],
    consumerNumber: '123456789',
    amount: 2345,
    dueDate: '2025-05-15'
  };
  if(currentStep === Step.ENTER_PIN){
    setIsOnEnterPin(true)
  }else{
    setIsOnEnterPin(false)

  }

  const handlePayBill = () => {
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
    setCurrentStep(Step.VIEW_BILLS);
  };



  if (currentStep === Step.ENTER_PIN) {
    return (
      <EnterPINModal 
        onSuccess={handlePinSuccess}
        onCancel={() => setCurrentStep(Step.VIEW_BILLS)}
        amount={pendingBill.amount}
        recipient={pendingBill.provider.name}
      />
    );
  }

  if (currentStep === Step.PROCESSING) {
    return <PaymentProcessing amount={pendingBill.amount} recipient={pendingBill.provider.name} />;
  }

  if (currentStep === Step.SUCCESS) {
    return (
      <PaymentSuccess
        amount={pendingBill.amount}
        recipient={pendingBill.provider.name}
        onDone={handleDone}
      />
    );
  }

  return (
    <div className="">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6 mt-6">Electricity Bill</h1>
      
      {/* Pending Bill */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Pending Bill</h2>
        
        <Card className="bg-white dark:bg-gray-800 border-orange-100 dark:border-orange-900/20">
          <CardContent className="p-0">
            <div className="border-l-4 border-orange-500 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mr-3">
                    <img src={pendingBill.provider.logo} className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">{pendingBill.provider.name}</h3>
                    <p className="text-xs text-gray-500">Due on {new Date(pendingBill.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{pendingBill.amount}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p>Consumer No: {pendingBill.consumerNumber}</p>
              </div>
              
              <Button
                variant='glow'
                onClick={handlePayBill}
                className="w-full"
              >
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Providers List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Select Provider</h2>
        
        <div className="space-y-4">
          {electricityProviders.map(provider => (
            <button
              key={provider.id}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex space-x-4 items-center">
                  <img 
                    src={provider.logo} 
                    alt={provider.name}
                    className="w-8 h-18" 
                  />
                
                <div className="text-left">
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-xs text-gray-500">Tap to select</p>
                </div>
              </div>
              {provider.id === pendingBill.provider.id && (
                <CheckCircle size={20} className="text-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectricityBill;
