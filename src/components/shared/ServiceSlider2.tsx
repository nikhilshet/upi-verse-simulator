
import React, { useRef } from 'react';
import { LucideIcon } from "lucide-react";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

interface Service {
    id: string;
    name: string;
    icon: string;
    color: string;
}

interface ServiceSliderProps {
    services: Service[];
    classProps: string;
}


const ServiceSlider2: React.FC<ServiceSliderProps> = ({ services, classProps }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const { setIsOnEnterPin } = useAppContext();
    const navigate = useNavigate();
    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { current } = sliderRef;
            const scrollAmount = direction === 'left' ? -200 : 200;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    function onServiceClick(id: string, name: string) {
        if (id === "electricity" || id === "fastag") {
            navigate(`/bbps/${id}`)
        } else if (id === "mutualfunds") {
            setIsOnEnterPin(true);
            navigate(`/ondc/${id}`)
        }
        else {
            toast({
                title: "Coming Soon",
                description: `${name} is Coming soon`
            })
        }
    }


    return (
        <div className={`relative ${classProps}`}>
            <div
                ref={sliderRef}
                className="flex justify-between overflow-x-auto hide-scrollbar py-3 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {services.map((service , index) => (

                    <div
                        key={service.id}
                        className="flex-none w-40 h-40 flex flex-col items-center justify-center transition-all cursor-pointer"
                        onClick={() => onServiceClick(service.id, service.name)}
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-gray-800">
                            <img src={service.icon + index} alt="icon" className="w-full h-full object-cover" />
                        </div>
                        <span className="mt-3 text-xl font-medium text-gray-700 dark:text-gray-300 text-center">
                            {service.name}
                        </span>
                    </div>
                ))}
            </div>

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

export default ServiceSlider2;
