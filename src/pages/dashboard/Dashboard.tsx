
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import BalanceCard from './BalanceCard';
import FeatureGrid from './FeatureGrid';
import ServiceSlider from '../../components/shared/ServiceSlider';
import { BadgeAlert, Car, ChevronRight, CloudOff, CreditCard, CreditCardIcon, Pizza, ScanLine, ShoppingBag, ShoppingBasket, TrainIcon, Wallet } from 'lucide-react';
import { Shield, Droplets, Building2, FlameKindling, Tv, Smartphone, Zap, SmartphoneCharging } from 'lucide-react';
import { Banknote, BarChart3, LineChart, TrendingUp, IndianRupee } from 'lucide-react';
import { Plane, Bus, Train, Gem, Ticket, BedDouble  , Gift} from 'lucide-react';

import { toast } from '@/hooks/use-toast';


const Dashboard = () => {
  const { user, isOnEnterPin, setIsOnEnterPin } = useAppContext();
  const navigate = useNavigate();

  // BBPS services
  const thirdParty = [
  { id: 'flights', name: 'Flights', icon: Plane, color: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  { id: 'bus', name: 'Bus', icon: Bus, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'trains', name: 'Trains', icon: Train, color: 'bg-rose-100', iconColor: 'text-rose-600' },
  { id: 'getloan', name: 'Get Loan', icon: Banknote, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: 'investgold', name: 'Invest in Gold', icon: Gem, color: 'bg-amber-100', iconColor: 'text-amber-600' }
];

const thirdParty2 = [
  { id: 'movies', name: 'Movie Tickets', icon: Ticket, color: 'bg-red-100', iconColor: 'text-red-600' },
  { id: 'hotels', name: 'Hotels', icon: BedDouble, color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'giftcard', name: 'Gift Cards', icon: Gift, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'events', name: 'Event', icon: Bus, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'taxe', name: 'Taxi', icon: Car, color: 'bg-red-100', iconColor: 'text-red-600' }
];

const bbpsServices = [
  { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'fastag', name: 'FASTag Recharge', icon: Car, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'dth', name: 'DTH & Broadband', icon: Tv, color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'gas', name: 'Gas Bill', icon: FlameKindling, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'rent', name: 'Rent Payment', icon: Building2, color: 'bg-pink-100', iconColor: 'text-pink-600' },
  { id: 'water', name: 'Water Bill', icon: Droplets, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'insurance', name: 'Insurance Premium', icon: Shield, color: 'bg-indigo-100', iconColor: 'text-indigo-600' }
];

const ondcServices = [
  { id: 'finserv', name: 'Finserv', icon: Banknote, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'ecom', name: 'E-commerce', icon: ShoppingBasket, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'transit', name: 'Transit', icon: TrainIcon, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'food', name: 'Food Delivery', icon: Pizza, color: 'bg-red-100', iconColor: 'text-red-600' }
];

const upi = [
  { id: 'creditline', name: 'Credit Line', icon: CreditCard, color: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'creditcard', name: 'Credit Card', icon: CreditCardIcon, color: 'bg-red-100', iconColor: 'text-red-600' },
  { id: 'ppi', name: 'PPI', icon: Wallet, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'acifsc', name: 'AC-IFSC', icon: ScanLine, color: 'bg-blue-100', iconColor: 'text-blue-600' }
];


  //mf service
  // const mutualFundsServices = [
  //   { id: 'mutualfunds', name: 'Mutual Funds', icon: Banknote, color: 'text-green-600' },
  //   { id: 'largecap', name: 'Large Cap', icon: BarChart3, color: 'text-blue-600' },
  //   { id: 'midcap', name: 'Mid Cap', icon: LineChart, color: 'text-purple-600' },
  //   { id: 'smallcap', name: 'Small Cap', icon: TrendingUp, color: 'text-pink-600' },
  //   { id: 'start500', name: 'Start with ₹500', icon: IndianRupee, color: 'text-yellow-600' }
  // ];
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



  useEffect(() => {
    setIsOnEnterPin(false);
  }, [])
  return (
    
    <div className="flex flex-col space-y-7">
      {/* <BalanceCard balance={user?.balance || 0} /> */}

      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">NBFC Services</h2>
        <FeatureGrid />
      </section>
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">UPI Platform</h2>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className=''>
          <ServiceSlider
            services={upi}
            // onServiceClick={(id) => handleServiceClick('ondc', id)}
            classProps="bg-[#81B1CD1A] dark:bg-gray-800/90 rounded-xl shadow-lg  border border-gray-100 dark:border-gray-800/90"
          />
        </div>

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
          classProps="bg-[#81B1CD1A] dark:bg-gray-800/90 rounded-xl shadow-lg  border border-gray-100 dark:border-gray-800/90"
        />


      </section>
         <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Other Services</h2>
          <button
            onClick={() => navigate('/thirdparty')}
            className="flex items-center text-upi-blue dark:text-upi-blue-light text-sm font-medium"
          >
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className=" bg-[#81B1CD1A] dark:bg-gray-800/90 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800/90">
          <ServiceSlider
          services={thirdParty}
          classProps=""
        />
         <ServiceSlider
          services={thirdParty2}
          classProps=""
        />
        </div>
        
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
        <div className='shadow-lg bg-[#81B1CD1A] rounded-xl border border-gray-100 dark:border-gray-800/90 dark:bg-gray-800 py-2'>
          <ServiceSlider
            services={ondcServices}
            // onServiceClick={(id) => handleServiceClick('ondc', id)}
            classProps=""

          />
        </div>

      </section>

      <div>
      </div>
      {/* <section className="flex flex-col space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>


        <div
          className="bg-gradient-to-r from-upi-green to-upi-green-light p-5 rounded-xl shadow-md cursor-pointer"
          onClick={() => navigate('/bazaar')}
        >
          <h3 className="text-white font-medium mb-2">UPI Bazaar</h3>
          <p className="text-white text-opacity-80 text-sm">Shop electronics, footwear & more</p>
        </div>
      </section> */}
    </div>
  );
};

export default Dashboard;
