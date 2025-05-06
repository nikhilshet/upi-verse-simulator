
import React from 'react';

interface StepperProps {
  children: React.ReactNode;
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ children, activeStep }) => {
  const steps = React.Children.toArray(children);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {step}
            {index < steps.length - 1 && (
              <div 
                className={`h-1 flex-grow mx-2 rounded ${
                  index < activeStep ? 'bg-upi-blue' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface StepProps {
  children?: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ children }) => {
  return <div className="flex flex-col items-center">{children}</div>;
};

interface StepLabelProps {
  children: React.ReactNode;
}

const StepLabel: React.FC<StepLabelProps> = ({ children }) => {
  return (
    <div className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
      {children}
    </div>
  );
};

export { Stepper, Step, StepLabel };
