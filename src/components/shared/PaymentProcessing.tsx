
import React from 'react';

const PaymentProcessing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-t-4 border-upi-blue opacity-25 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-upi-blue animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold mt-8">Processing Payment</h2>
      <p className="text-gray-500 mt-2">Please wait while we process your payment...</p>
    </div>
  );
};

export default PaymentProcessing;
