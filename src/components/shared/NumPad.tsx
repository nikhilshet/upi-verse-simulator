
import React, { useState } from 'react';
import { Delete, Check, Eye, EyeOff } from 'lucide-react';

interface NumPadProps {
  maxLength?: number;
  onComplete: (pin: string) => void;
  onCancel?: () => void;
}

const NumPad: React.FC<NumPadProps> = ({ 
  maxLength = 4, 
  onComplete,
  onCancel 
}) => {
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const handleNumberPress = (num: number) => {
    if (pin.length < maxLength) {
      const newPin = pin + num.toString();
      setPin(newPin);
      
      // Auto-submit when PIN reaches maximum length
      // if (newPin.length === maxLength) {
      //   setTimeout(() => onComplete(newPin), 300);
      // }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    if (pin.length > 0) {
      onComplete(pin);
    }
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  // Generate number buttons
  const renderNumberButtons = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <>
        
        {numbers.map(num => (
          <button
            key={num}
            className="text-black w-full h-16 bg-white flex  items-center justify-center text-2xl font-medium transition-all"
            onClick={() => handleNumberPress(num)}
          >
            {num}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="w-full mx-0  flex flex-col items-center">
      {/* PIN Display */}
    
      <div className="flex items-center justify-center w-full mb-24 relative">
        <div className="flex gap-3 items-center justify-center">
          {Array.from({ length: maxLength }).map((_, index) => (
            <div 
              key={index}
              className={`w-4 h-4 border border-black rounded-full ${index < pin.length ? 'bg-black' : 'bg-white'} transition-all ${pin.length === index ? 'scale-110' : ''}`}
            >
              {showPin && index < pin.length && (
                <span className="absolute -top-8 text-lg font-semibold">
                  {pin[index]}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* <button 
          className="absolute right-0 p-2"
          onClick={togglePinVisibility}
          aria-label={showPin ? "Hide PIN" : "Show PIN"}
        >
          {showPin ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button> */}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-[1px] border border-gray-500 w-full bg-black">
        {renderNumberButtons()}
        <button
          className="w-full h-16 bg-white flex  items-center justify-center text-2xl"
          onClick={handleDelete}
          aria-label="Delete"
        >
          <Delete className="h-6 w-6 text-black" />
        </button>

        <button
          className=" text-black w-full h-16 bg-white flex  items-center justify-center text-2xl "
          onClick={() => handleNumberPress(0)}
        >
          0
        </button>

        {/* <button
          className="w-full h-16 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center transition-all hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 shadow-sm"
          onClick={() => onCancel && onCancel()}
        >
          <div className="" ></div>
        </button> */}
        
        <button
        className='text-black w-full h-16 bg-white flex  items-center justify-center text-lg '
        onClick={handleSubmit}
        disabled={pin.length === 0}
      >
        SUBMIT
      </button>
        
        
      </div>

      {/* Submit button */}
      {/* <button
        className={`mt-6 w-full h-12 rounded-full flex items-center justify-center transition-all ${
          pin.length > 0
            ? 'bg-upi-blue text-white hover:bg-upi-blue-dark active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        onClick={handleSubmit}
        disabled={pin.length === 0}
      >
        <Check className="h-5 w-5 mr-2" />
        Confirm
      </button> */}
    </div>
  );
};

export default NumPad;
