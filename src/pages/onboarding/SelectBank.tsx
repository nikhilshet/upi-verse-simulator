
import React from 'react';
import { Building2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface SelectBankProps {
  sim: string;
  onSelect: (bank: string) => void;
}

const SelectBank: React.FC<SelectBankProps> = ({ sim, onSelect }) => {
    const {user , setUser} = useAppContext()
  
  // Simulate different banks based on selected SIM
  const banks = sim === 'sim1' 
    ? [
        { id: 'sbi', name: 'State Bank of India', accountNo: '**** 5678' },
        { id: 'hdfc', name: 'HDFC Bank', accountNo: '**** 9012' }
      ]
    : [
        { id: 'icici', name: 'ICICI Bank', accountNo: '**** 3456' },
        { id: 'axis', name: 'Axis Bank', accountNo: '**** 7890' }
      ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Select your Bank Account
      </h2>
      
      <div className="grid grid-cols-1 gap-4 w-full">
        {banks.map((bank) => (
          <button
            key={bank.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => onSelect(bank.id)}
          >
            <div className="flex items-center">
              <div className="bg-upi-green-light dark:bg-upi-green rounded-full p-2 mr-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{bank.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{bank.accountNo}</p>
              </div>
            </div>
            <div className="text-upi-green dark:text-upi-green-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectBank;
