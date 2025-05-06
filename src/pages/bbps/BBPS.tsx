
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';

const BBPS = () => {
  const navigate = useNavigate();
  
  const services = [
    { id: 'electricity', name: 'Electricity', icon: 'electricity', color: 'bg-yellow-500' },
    { id: 'mobile', name: 'Mobile Recharge', icon: 'mobile-recharge', color: 'bg-blue-500' },
    { id: 'dth', name: 'DTH & Broadband', icon: 'dth-broadband', color: 'bg-purple-500' },
    { id: 'gas', name: 'Gas Bill', icon: 'gas-bill', color: 'bg-green-500' },
    { id: 'rent', name: 'Rent Payment', icon: 'rent-payment', color: 'bg-pink-500' },
    { id: 'water', name: 'Water Bill', icon: 'water', color: 'bg-blue-400' },
    { id: 'insurance', name: 'Insurance Premium', icon: 'insurance', color: 'bg-indigo-500' },
    { id: 'credit-card', name: 'Credit Card', icon: 'credit-card', color: 'bg-red-500' },
    { id: 'fastag', name: 'FASTag Recharge', icon: 'fastag', color: 'bg-orange-500' },
    { id: 'education', name: 'School/College Fee', icon: 'education', color: 'bg-cyan-500' },
    { id: 'municipal', name: 'Municipal Services', icon: 'municipal', color: 'bg-lime-500' },
    { id: 'housing', name: 'Housing Society', icon: 'housing', color: 'bg-emerald-500' }
  ];
  
  const handleServiceClick = (id: string) => {
    // In a real app, this would navigate to the specific service page
    navigate(`/bbps/${id}`);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Bill Payments</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          type="text"
          placeholder="Search for a biller..."
        />
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Bill Payment & Recharge
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleServiceClick(service.id)}
          >
            <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mb-2`}>
              <span className="text-white text-sm font-medium">{service.name.charAt(0)}</span>
            </div>
            <span className="text-xs text-center text-gray-700 dark:text-gray-300">
              {service.name}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
          Recent Payments
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-2 mr-3">
                <span className="text-white text-xs">E</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Electricity Bill</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">State Electricity Board</p>
              </div>
            </div>
            <p className="text-sm font-medium">₹1,250</p>
          </div>
          
          <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full p-2 mr-3">
                <span className="text-white text-xs">M</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Mobile Recharge</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jio</p>
              </div>
            </div>
            <p className="text-sm font-medium">₹299</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BBPS;
