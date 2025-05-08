
import React from 'react';
interface PaymentProcessProps {
  amount: number;
  recipient: string;

}
const PaymentProcessing: React.FC<PaymentProcessProps> = ({amount, recipient}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-t-4 border-upi-blue opacity-25 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-upi-blue animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold mt-8">Processing Payment</h2>
      <p className="text-gray-500 mt-2">Payment In Process to {recipient} </p>
      <p className=''>₹{amount}</p>
    </div>
  );
};

export default PaymentProcessing;
