import { LucideIcon, Search, Smartphone, Zap } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";

interface ServiceArrObj{
    id:string
    name:string
    icon:LucideIcon
    color:string
}

interface extraDetails{
    title:string
    subTitle:string
    service1:string
    service2:string
    merchant1:string
    amount1:string
    merchant2:string
    amount2:string
    icon1:LucideIcon
    icon2:LucideIcon


}

interface ServicesDashboardProps{
    services:ServiceArrObj[]
    handleServiceClick:(id:string , name:string)=>void
    extraDetails:extraDetails
}
const ServicesDashboard: React.FC<ServicesDashboardProps>=({services , handleServiceClick , extraDetails} )=>{
return(
    <div className="flex flex-col pt-6">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{extraDetails.title}</h1>
    
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        className="pl-10"
        type="text"
        placeholder="Search for a biller..."
      />
    </div>
    
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
     {extraDetails.subTitle}
    </h2>
    
    <div className="grid grid-cols-3 gap-4">
      {services.map((service) => {
        const IconComponent = service.icon;
        return (
          <button
            key={service.id}
            className="flex flex-col items-center p-4 rounded-lg transition-shadow"
            onClick={() => handleServiceClick(service.id , service.name)}
          >
            <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mb-2`}>
              <IconComponent className="text-white" size={20} />
            </div>
            <span className="text-xs text-center text-gray-700 dark:text-gray-300">
              {service.name}
            </span>
          </button>
        );
      })}
    </div>
    
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-md font-medium text-gray-800 dark:text-white mb-2">
        Recent Payments
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-md">
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full p-2 mr-3">
              <extraDetails.icon1 className="text-white" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{extraDetails.service1}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{extraDetails.merchant1}</p>
            </div>
          </div>
          <p className="text-sm font-medium">₹ {extraDetails.amount1}</p>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-md">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <extraDetails.icon2 className="text-white" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{extraDetails.service2}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{extraDetails.merchant2}</p>
            </div>
          </div>
          <p className="text-sm font-medium">₹ {extraDetails.amount2}</p>
        </div>
      </div>
    </div>
  </div>
)
}
export default ServicesDashboard