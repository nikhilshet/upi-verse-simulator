
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import BalanceCard from './BalanceCard';
import FeatureGrid from './FeatureGrid';
import ServiceSlider from '../../components/shared/ServiceSlider';
import { BadgeAlert, Car, ChevronRight, ShoppingBag } from 'lucide-react';
import { Shield, Droplets, Building2, FlameKindling, Tv, Smartphone, Zap, SmartphoneCharging } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  
  // BBPS services
  const bbpsServices = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-500' },
    { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: 'text-blue-500' },
    { id: 'dth', name: 'DTH & Broadband', icon: Tv, color: 'text-purple-500' },
    { id: 'gas', name: 'Gas Bill', icon: FlameKindling, color: 'text-green-500' },
    { id: 'rent', name: 'Rent Payment', icon: Building2, color: 'text-pink-500' },
    { id: 'water', name: 'Water Bill', icon: Droplets, color: 'text-blue-400' },
    { id: 'insurance', name: 'Insurance Premium', icon: Shield, color: 'text-indigo-500' },
  ]

  // ONDC services

  const ondcServices = [
    { id: 'mobility', name: 'Mobility', icon: Car ,color:'text-blue-500'},
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingBag , color:'text-yellow-500' },
    { id: 'quickecom', name: 'Quick Ecom', icon: BadgeAlert , color:'text-pink-500' },
    { id: 'mobility', name: 'Mobility', icon: Car ,color:'text-blue-500'},
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingBag , color:'text-yellow-500' },
    { id: 'quickecom', name: 'Quick Ecom', icon: BadgeAlert , color:'text-pink-500' }
  ];

  const handleServiceClick = (section: string, id: string) => {
    if (section === 'bbps') {
      navigate('/bbps');
    } else if (section === 'ondc') {
      navigate('/ondc');
    }
  };

  return (
    <div className="flex flex-col space-y-7">
      <BalanceCard balance={user?.balance || 0} />
      
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">UPI Services</h2>
        <FeatureGrid />
      </section>
      
      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Bill Payments</h2>
          <button 
            onClick={() => navigate('/bbps')}
            className="flex items-center text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <ServiceSlider 
          services={bbpsServices} 
          onServiceClick={(id) => handleServiceClick('bbps', id)}
        />
      </section>
      
      <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">ONDC Services</h2>
          <button 
            onClick={() => navigate('/ondc')}
            className="flex items-center text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <ServiceSlider 
          services={ondcServices} 
          onServiceClick={(id) => handleServiceClick('ondc', id)}
        />
      </section>
      
      <section className="flex flex-col space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div 
          className="bg-gradient-to-r from-upi-blue to-upi-blue-light p-5 rounded-xl shadow-md cursor-pointer"
          onClick={() => navigate('/financial')}
        >
          <h3 className="text-white font-medium mb-2">Financial Services</h3>
          <p className="text-white text-opacity-80 text-sm">Explore mutual funds, insurance & loans</p>
        </div>
        
        <div 
          className="bg-gradient-to-r from-upi-green to-upi-green-light p-5 rounded-xl shadow-md cursor-pointer"
          onClick={() => navigate('/bazaar')}
        >
          <h3 className="text-white font-medium mb-2">UPI Bazaar</h3>
          <p className="text-white text-opacity-80 text-sm">Shop electronics, footwear & more</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
