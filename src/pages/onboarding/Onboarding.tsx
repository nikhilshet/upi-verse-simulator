
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import SelectSim from './SelectSim';
import SelectBank from './SelectBank';
import EnterPin from './EnterPin';
import ConfirmPin from './ConfirmPin';
import { Stepper, Step, StepLabel } from './Stepper';

const Onboarding = () => {
  const { setUser, setIsOnboarded, setIsPinSet } = useAppContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '9876543210',
    email: 'john.doe@example.com',
    selectedSim: '',
    selectedBank: '',
    upiPin: '',
    balance: 12500,
  });

  const steps = ['Select SIM', 'Select Bank', 'Set UPI PIN', 'Confirm PIN'];

  const handleSimSelection = (sim: string) => {
    setUserData({ ...userData, selectedSim: sim });
    setActiveStep(1);
  };

  const handleBankSelection = (bank: string) => {
    setUserData({ ...userData, selectedBank: bank });
    setActiveStep(2);
  };

  const handlePinEntered = (pin: string) => {
    setUserData({ ...userData, upiPin: pin });
    setActiveStep(3);
  };

  const handlePinConfirmed = (pin: string) => {
    setUserData({ ...userData, upiPin: pin });
    setUser({ ...userData, upiPin: pin });
    setIsPinSet(true);
    setIsOnboarded(true);
    navigate('/');
  };

  const handleBackToPinEntry = () => {
    setActiveStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-upi-blue to-upi-blue-dark flex flex-col items-center justify-start pt-10 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome to UPI Verse
        </h1>
        
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8">
          {activeStep === 0 && <SelectSim onSelect={handleSimSelection} />}
          {activeStep === 1 && <SelectBank sim={userData.selectedSim} onSelect={handleBankSelection} />}
          {activeStep === 2 && <EnterPin onComplete={handlePinEntered} />}
          {activeStep === 3 && (
            <ConfirmPin 
              originalPin={userData.upiPin} 
              onComplete={handlePinConfirmed}
              onBack={handleBackToPinEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
