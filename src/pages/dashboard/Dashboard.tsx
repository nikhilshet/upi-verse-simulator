
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import BalanceCard from './BalanceCard';
import FeatureGrid from './FeatureGrid';
import ServiceSlider from '../../components/shared/ServiceSlider';
import { BadgeAlert, Car, ChevronRight, ShoppingBag } from 'lucide-react';
import { Shield, Droplets, Building2, FlameKindling, Tv, Smartphone, Zap, SmartphoneCharging } from 'lucide-react';
import { Banknote, BarChart3, LineChart, TrendingUp, IndianRupee } from 'lucide-react';
import { toast } from '@/hooks/use-toast';


const Dashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  // BBPS services
  const bbpsServices = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-500' },
        { id: 'fastag', name: 'FASTag Recharge', icon: Car, color: 'text-orange-500' },
    
    { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: 'text-blue-500' },
    { id: 'dth', name: 'DTH & Broadband', icon: Tv, color: 'text-purple-500' },
    { id: 'gas', name: 'Gas Bill', icon: FlameKindling, color: 'text-green-500' },
    { id: 'rent', name: 'Rent Payment', icon: Building2, color: 'text-pink-500' },
    { id: 'water', name: 'Water Bill', icon: Droplets, color: 'text-blue-400' },
    { id: 'insurance', name: 'Insurance Premium', icon: Shield, color: 'text-indigo-500' },
  ]

  // // ONDC services
  // const ondcServices = [
  //   { id: 'mobility', name: 'Mobility', icon: Car ,color:'text-white'},
  //   { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingBag , color:'text-white' },
  //   { id: 'quickecom', name: 'Quick Ecom', icon: BadgeAlert , color:'text-white' },
  //   { id: 'mobility1', name: 'Mobility', icon: Car ,color:'text-white'},
  //   { id: 'ecommerce1', name: 'E-Commerce', icon: ShoppingBag , color:'text-white' },
  //   { id: 'quickecom1', name: 'Quick Ecom', icon: BadgeAlert , color:'text-white' }
  // ];

  // //mf service
  // const mutualFundsServices = [
  //   { id: 'mutualfunds', name: 'Mutual Funds', icon: Banknote, color: 'text-white' },
  //   { id: 'largecap', name: 'Large Cap', icon: BarChart3, color: 'text-white' },
  //   { id: 'midcap', name: 'Mid Cap', icon: LineChart, color: 'text-white' },
  //   { id: 'smallcap', name: 'Small Cap', icon: TrendingUp, color: 'text-white' },
  //   { id: 'start500', name: 'Start with ₹500', icon: IndianRupee, color: 'text-white' }
  // ];
  const ondcServices = [
    { id: 'mobility', name: 'Mobility', icon: Car, color: 'text-blue-500' },
    
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingBag, color: 'text-yellow-500' },
    { id: 'quickecom', name: 'Quick Ecom', icon: BadgeAlert, color: 'text-pink-500' },
    { id: 'mobility1', name: 'Mobility', icon: Car, color: 'text-blue-500' },
    { id: 'ecommerce1', name: 'E-Commerce', icon: ShoppingBag, color: 'text-yellow-500' },
    { id: 'quickecom1', name: 'Quick Ecom', icon: BadgeAlert, color: 'text-pink-500' }
  ];

  //mf service
  const mutualFundsServices = [
    { id: 'mutualfunds', name: 'Mutual Funds', icon: Banknote, color: 'text-green-600' },
    { id: 'largecap', name: 'Large Cap', icon: BarChart3, color: 'text-blue-600' },
    { id: 'midcap', name: 'Mid Cap', icon: LineChart, color: 'text-purple-600' },
    { id: 'smallcap', name: 'Small Cap', icon: TrendingUp, color: 'text-pink-600' },
    { id: 'start500', name: 'Start with ₹500', icon: IndianRupee, color: 'text-yellow-600' }
  ];
  // const handleServiceClick = (section: string, id: string) => {
  //   if (section === 'bbps') {
  //     navigate('/bbps');
  //   } else if (section === 'ondc') {
  //     navigate('/ondc');
  //   }
  // };

  // const handleServiceClick = (id: string , name:string) => {
  //   // In a real app, this would navigate to the specific service page
  //   if(id === 'electricity' || id === "fastag"){
  //     navigate(`/bbps/${id}`);
  //   }
  //   else{
  //     toast({
  //       title: "Coming Soon",
  //       description: `${name} Feature Coming Soon`,
  //   });
  //   }
  // };

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
          // onServiceClick={(id) => handleServiceClick()}
          classProps="bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/90"
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
        <div className='bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/90 bg-white dark:bg-gray-800 rounded-md py-2'>
          <ServiceSlider
            services={ondcServices}
            // onServiceClick={(id) => handleServiceClick('ondc', id)}
            classProps=""

          />
          <ServiceSlider
            services={mutualFundsServices}
            // onServiceClick={(id) => handleServiceClick('', id)}
            classProps=""

          />
        </div>

      </section>

      <section className="flex flex-col space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>


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
