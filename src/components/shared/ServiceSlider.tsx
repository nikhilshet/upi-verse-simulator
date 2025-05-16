
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LucideIcon } from "lucide-react";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

interface Service {
  id: string;
  name: string;
  icon: LucideIcon;
  color:string;
  iconColor:string;
}

interface ServiceSliderProps {
  services: Service[];
  classProps : string;
}


const ServiceSlider: React.FC<ServiceSliderProps> = ({ services, classProps}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {setIsOnEnterPin} = useAppContext();
  const navigate = useNavigate();
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  function onServiceClick(id:string , name:string){
    if(id === "electricity" || id === "fastag"){
      navigate(`/bbps/${id}`)
    }else if(id === "mutualfunds" ){
      setIsOnEnterPin(true);
      navigate(`/ondc/${id}`)
    }else if(id === "ecom"){
      navigate('/ondc/ecom')
    }
    else{
      toast({
        title:"Coming Soon",
        description : `${name} is Coming soon`
      })
    }
  }

  // console.log(services)
  // Get color based on service icon name
  // const getIconColor = (iconName: string) => {
  //   const colors: Record<string, string> = {
  //     electricity: 'bg-yellow-500',
  //     'mobile-recharge': 'bg-blue-500',
  //     'dth-broadband': 'bg-purple-500',
  //     'gas-bill': 'bg-green-500',
  //     'rent-payment': 'bg-pink-500',
  //     mobility: 'bg-indigo-500',
  //     'e-commerce': 'bg-red-500',
  //     'quick-ecom': 'bg-orange-500',
  //     water: 'bg-blue-400',
  //     insurance: 'bg-teal-500',
  //     'credit-card': 'bg-slate-500',
  //     education: 'bg-emerald-500',
  //   };
    
  //   return colors[iconName] || 'bg-upi-blue';
  // };

  // Simple icon mapping function
  // const getIconComponent = (iconName: string) => {
  //   const iconColor = getIconColor(iconName);
    
  //   return (
  //     <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center text-white`}>
  //       <span className="text-base font-medium">{iconName.slice(0, 1).toUpperCase()}</span>
  //     </div>
  //   );
  // };

  return (
    <div className={`relative ${classProps} `}>

      {/* <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button> */}
      
      <div
        ref={sliderRef}
        className="flex justify-between overflow-x-auto hide-scrollbar gap-4 py-3 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          
          <div
            key={service.id}
            // className="flex-none w-20 flex flex-col items-center bg-white dark:bg-gray-800 p-4 transition-all cursor-pointer"
            className="flex-none w-20 flex flex-col items-center p-4 transition-all cursor-pointer"
            onClick={()=>onServiceClick(service.id , service.name)}
          >
            {/* {getIconComponent(service.icon)} */}
              {/* <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white`}>  */}
              <div className={`  w-12 h-12 rounded-full flex items-center ${service.color} justify-center text-white`}> 

              <service.icon className={service.iconColor} size={25}/>
              {/* className={service.color} */}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {service.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button> */}
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default ServiceSlider;
