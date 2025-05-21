
import React from 'react';
import { CreditCard } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import Airtel from '../../assets/Airtel.svg'
import Jio from '../../assets/Jio.svg'

interface SelectSimProps {
  onSelect: (sim: string) => void;
}

const SelectSim: React.FC<SelectSimProps> = ({ onSelect }) => {
    const {user , setUser} = useAppContext()
  
  const sims = [
    { id: 'sim1', name: 'Airtel', number: '9876543211' , logo:Airtel },
    { id: 'sim2', name: 'Jio', number: '8765432109' , logo:Jio }
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Select your SIM card
      </h2> 
      <div className="flex justify-center gap-4 w-full">
        {sims.map((sim) => (
          <button 
            key={sim.id}
            className="flex flex-col w-32 h-48 items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => onSelect(sim.id)}
          >
            <div className="flex items-center">
              <div>
              <img src={sim.logo} className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">{sim.name}</p>
                <p className="text-md text-gray-500 dark:text-gray-300">{sim.number}</p>
              </div>
            <div className="text-upi-blue dark:text-upi-blue-light">
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

export default SelectSim;
