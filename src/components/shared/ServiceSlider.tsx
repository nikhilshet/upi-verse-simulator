
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  icon: string;
}

interface ServiceSliderProps {
  services: Service[];
  onServiceClick: (id: string) => void;
}

const ServiceSlider: React.FC<ServiceSliderProps> = ({ services, onServiceClick }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Get color based on service icon name
  const getIconColor = (iconName: string) => {
    const colors: Record<string, string> = {
      electricity: 'bg-yellow-500',
      'mobile-recharge': 'bg-blue-500',
      'dth-broadband': 'bg-purple-500',
      'gas-bill': 'bg-green-500',
      'rent-payment': 'bg-pink-500',
      mobility: 'bg-indigo-500',
      'e-commerce': 'bg-red-500',
      'quick-ecom': 'bg-orange-500',
      water: 'bg-blue-400',
      insurance: 'bg-teal-500',
      'credit-card': 'bg-slate-500',
      education: 'bg-emerald-500',
    };
    
    return colors[iconName] || 'bg-upi-blue';
  };

  // Simple icon mapping function
  const getIconComponent = (iconName: string) => {
    const iconColor = getIconColor(iconName);
    
    return (
      <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center text-white`}>
        <span className="text-base font-medium">{iconName.slice(0, 1).toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      
      <div
        ref={sliderRef}
        className="flex overflow-x-auto hide-scrollbar gap-4 py-3 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="flex-none w-32 flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-pointer"
            onClick={() => onServiceClick(service.id)}
          >
            {getIconComponent(service.icon)}
            <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {service.name}
            </span>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      
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
