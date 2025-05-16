import { Banknote , ShoppingBasket , TrainIcon , Pizza } from 'lucide-react';
import React from 'react';
import { Navigation, ShoppingBag, FastForward , PackageCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

import ServicesDashboard from '@/components/shared/ServicesDashboard';

const ONDC = () => {
  const navigate = useNavigate();
  const ondcServices = [
    // { id: 'mobility', name: 'Mobility', icon: Car, color: 'text-blue-500' },

    // { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingBag, color: 'text-yellow-500' },
    // { id: 'quickecom', name: 'Quick Ecom', icon: BadgeAlert, color: 'text-pink-500' },
    // { id: 'mobility1', name: 'Mobility', icon: Car, color: 'text-blue-500' },
    // { id: 'ecommerce1', name: 'E-Commerce', icon: ShoppingBag, color: 'text-yellow-500' },
    // { id: 'quickecom1', name: 'Quick Ecom', icon: BadgeAlert, color: 'text-pink-500' }
    { id: 'finserv', name: 'Finserv', icon: Banknote, color: 'bg-blue-500' },
    {id:'ecom' , name:'E-commerce' , icon:ShoppingBasket , color:'bg-green-500'},
    {id:'transit' , name:'Transit' , icon:TrainIcon , color : 'bg-yellow-500'},
    {id:'food' , name:'Food Delivery' , icon:Pizza , color:'bg-red-500'}
  ];
  const extraDetailsONDC = {
    title: "ONDC",
    subTitle: "ONDC Services",
    merchant1: "FabIndia",
    amount1: "1249",
    merchant2: "Himalaya Wellness",
    amount2: "599",
    icon1: ShoppingBag, // e.g., import from lucide-react
    icon2: PackageCheck,
    service1: "Clothing & Apparel",
    service2: "Health & Personal Care"
  };
  const handleclick = (id: string , name:string) => {
    // In a real app, this would navigate to the specific service page
    if(id === "ecom"){
      
      navigate(`/ondc/${id}`);
    }
    else{
      toast({
        title: "Coming Soon",
        description: `${name} Feature Coming Soon`,
    });
    }
  };
  const services = [
    {
      id: 'mobility',
      name: 'Mobility',
      icon: Navigation,
      description: 'Book cabs, auto rickshaws & more',
      categories: [
        { id: 'cab', name: 'Cabs', image: 'https://images.unsplash.com/photo-1568844631315-716e4a08f550' },
        { id: 'auto', name: 'Auto', image: 'https://images.unsplash.com/photo-1665911215126-1746ebd97769' },
        { id: 'bike', name: 'Bike', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' },
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      icon: ShoppingBag,
      description: 'Shop from local stores & more',
      categories: [
        { id: 'grocery', name: 'Grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e' },
        { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
        { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
      ]
    },
    {
      id: 'quickecom',
      name: 'Quick Ecom',
      icon: FastForward,
      description: 'Quick commerce with instant delivery',
      categories: [
        { id: 'food', name: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
        { id: 'medicine', name: 'Medicine', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae' },
        { id: 'snacks', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60' },
      ]
    }
  ];

  return (
    <ServicesDashboard services={ondcServices} handleServiceClick={handleclick} extraDetails={extraDetailsONDC}/>
    // <div className="flex flex-col pb-4">
    //   <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">ONDC Services</h1>
      
    //   {services.map((service) => (
    //     <div key={service.id} className="mb-8">
    //       <div className="flex items-center mb-2">
    //         <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-2">
    //           <service.icon size={20} className="text-upi-blue dark:text-upi-blue-light" />
    //         </div>
    //         <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
    //           {service.name}
    //         </h2>
    //       </div>
          
    //       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
    //         {service.description}
    //       </p>
          
    //       <div className="flex overflow-x-auto hide-scrollbar gap-4">
    //         {service.categories.map((category) => (
    //           <div 
    //             key={category.id}
    //             className="flex-none w-40 rounded-lg overflow-hidden shadow-sm"
    //           >
    //             <div
    //               className="h-24 bg-gray-200 bg-cover bg-center"
    //               style={{ backgroundImage: `url(${category.image}?w=160&h=96&fit=crop&auto=format)` }}
    //             ></div>
    //             <div className="p-3 bg-white dark:bg-gray-800">
    //               <h3 className="font-medium text-gray-800 dark:text-white text-sm">
    //                 {category.name}
    //               </h3>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
      
    //   <style>
    //     {`
    //       .hide-scrollbar::-webkit-scrollbar {
    //         display: none;
    //       }
    //     `}
    //   </style>
    // </div>
  );
};

export default ONDC;
