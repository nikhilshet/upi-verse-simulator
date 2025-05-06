
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import BalanceCard from './BalanceCard';
import FeatureGrid from './FeatureGrid';
import ServiceSlider from '../../components/shared/ServiceSlider';

const Dashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  
  // BBPS services
  const bbpsServices = [
    { id: 'electricity', name: 'Electricity', icon: 'electricity' },
    { id: 'mobile', name: 'Mobile Recharge', icon: 'mobile-recharge' },
    { id: 'dth', name: 'DTH & Broadband', icon: 'dth-broadband' },
    { id: 'gas', name: 'Gas Bill', icon: 'gas-bill' },
    { id: 'rent', name: 'Rent Payment', icon: 'rent-payment' }
  ];

  // ONDC services
  const ondcServices = [
    { id: 'mobility', name: 'Mobility', icon: 'mobility' },
    { id: 'ecommerce', name: 'E-Commerce', icon: 'e-commerce' },
    { id: 'quickecom', name: 'Quick Ecom', icon: 'quick-ecom' }
  ];

  const handleServiceClick = (section: string, id: string) => {
    if (section === 'bbps') {
      navigate('/bbps');
    } else if (section === 'ondc') {
      navigate('/ondc');
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <BalanceCard balance={user?.balance || 0} />
      
      <FeatureGrid />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Bill Payments</h2>
          <button 
            onClick={() => navigate('/bbps')}
            className="text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
          </button>
        </div>
        
        <ServiceSlider 
          services={bbpsServices} 
          onServiceClick={(id) => handleServiceClick('bbps', id)}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">ONDC Services</h2>
          <button 
            onClick={() => navigate('/ondc')}
            className="text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
          </button>
        </div>
        
        <ServiceSlider 
          services={ondcServices} 
          onServiceClick={(id) => handleServiceClick('ondc', id)}
        />
      </div>
      
      <div className="flex space-x-4">
        <div 
          className="flex-1 bg-gradient-to-r from-upi-blue to-upi-blue-light p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate('/financial')}
        >
          <h3 className="text-white font-medium mb-2">Financial Services</h3>
          <p className="text-white text-opacity-80 text-sm">Explore mutual funds, insurance & loans</p>
        </div>
        
        <div 
          className="flex-1 bg-gradient-to-r from-upi-green to-upi-green-light p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate('/bazaar')}
        >
          <h3 className="text-white font-medium mb-2">UPI Bazaar</h3>
          <p className="text-white text-opacity-80 text-sm">Shop electronics, footwear & more</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
