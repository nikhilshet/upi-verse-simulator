
import React from 'react';
import { Search, Zap, Smartphone, Tv, FlameKindling, Building2, Droplets, Shield, CreditCard, Car, GraduationCap, Building } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import ServicesDashboard from '@/components/shared/ServicesDashboard';

const BBPS = () => {
  const navigate = useNavigate();
  
  const bbpsServices = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
    { id: 'fastag', name: 'FASTag Recharge', icon: Car, color: 'bg-orange-500' },
    { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'dth', name: 'DTH & Broadband', icon: Tv, color: 'bg-purple-500' },
    { id: 'gas', name: 'Gas Bill', icon: FlameKindling, color: 'bg-green-500' },
    { id: 'rent', name: 'Rent Payment', icon: Building2, color: 'bg-pink-500' },
    { id: 'water', name: 'Water Bill', icon: Droplets, color: 'bg-blue-400' },
    { id: 'insurance', name: 'Insurance Premium', icon: Shield, color: 'bg-indigo-500' },
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard, color: 'bg-red-500' },
    { id: 'education', name: 'School/College Fee', icon: GraduationCap, color: 'bg-cyan-500' },
    { id: 'municipal', name: 'Municipal Services', icon: Building, color: 'bg-lime-500' },
    { id: 'housing', name: 'Housing Society', icon: Building2, color: 'bg-emerald-500' }
  ];
  
  const handleServiceClick = (id: string , name:string) => {
    if(id === 'electricity' || id === "fastag"){
      navigate(`/bbps/${id}`);
    }
    else{
      toast({
        title: "Coming Soon",
        description: `${name} Feature Coming Soon`,
    });
    }
  };

const extraDetails = {
  title:"Bill Payment",
  subTitle:"Bill Payment and Recharge",
  merchant1:"Reliance",
  amount1:"2000",
  merchant2:"Jio",
  amount2:"299",
  icon1:Zap,
  icon2:Smartphone,
  service1:"Electricity Bill",
  service2:"Mobile Recharge"
}
  return (
    <ServicesDashboard services={bbpsServices} handleServiceClick={handleServiceClick} extraDetails={extraDetails}/>
    // <div className="flex flex-col pt-6">
    //   <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Bill Payments</h1>
      
    //   <div className="relative mb-6">
    //     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    //     <Input
    //       className="pl-10"
    //       type="text"
    //       placeholder="Search for a biller..."
    //     />
    //   </div>
      
    //   <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
    //     Bill Payment & Recharge
    //   </h2>
      
    //   <div className="grid grid-cols-3 gap-4">
    //     {services.map((service) => {
    //       const IconComponent = service.icon;
    //       return (
    //         <button
    //           key={service.id}
    //           className="flex flex-col items-center p-4 rounded-lg transition-shadow"
    //           onClick={() => handleServiceClick(service.id , service.name)}
    //         >
    //           <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mb-2`}>
    //             <IconComponent className="text-white" size={20} />
    //           </div>
    //           <span className="text-xs text-center text-gray-700 dark:text-gray-300">
    //             {service.name}
    //           </span>
    //         </button>
    //       );
    //     })}
    //   </div>
      
    //   <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    //     <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
    //       Recent Payments
    //     </h3>
        
    //     <div className="space-y-4">
    //       <div className="flex items-center justify-between p-3 rounded-md">
    //         <div className="flex items-center">
    //           <div className="bg-yellow-500 rounded-full p-2 mr-3">
    //             <Zap className="text-white" size={16} />
    //           </div>
    //           <div>
    //             <p className="text-sm font-medium text-gray-800 dark:text-white">Electricity Bill</p>
    //             <p className="text-xs text-gray-500 dark:text-gray-400">State Electricity Board</p>
    //           </div>
    //         </div>
    //         <p className="text-sm font-medium">₹1,250</p>
    //       </div>
          
    //       <div className="flex items-center justify-between p-3 rounded-md">
    //         <div className="flex items-center">
    //           <div className="bg-blue-500 rounded-full p-2 mr-3">
    //             <Smartphone className="text-white" size={16} />
    //           </div>
    //           <div>
    //             <p className="text-sm font-medium text-gray-800 dark:text-white">Mobile Recharge</p>
    //             <p className="text-xs text-gray-500 dark:text-gray-400">Jio</p>
    //           </div>
    //         </div>
    //         <p className="text-sm font-medium">₹299</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BBPS;
