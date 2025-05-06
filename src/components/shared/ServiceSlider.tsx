
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

  // Simple icon mapping function
  const getIconComponent = (iconName: string) => {
    // This would normally use dynamic imports or icon libraries
    return (
      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-upi-blue dark:text-upi-blue-light text-xs">{iconName.slice(0, 1).toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      
      <div
        ref={sliderRef}
        className="flex overflow-x-auto hide-scrollbar gap-4 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="flex-none w-32 flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onServiceClick(service.id)}
          >
            {getIconComponent(service.icon)}
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300 text-center">
              {service.name}
            </span>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
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
