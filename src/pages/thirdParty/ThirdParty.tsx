import { Search, Zap, Smartphone, Tv, FlameKindling, Building2, Droplets, Shield, CreditCard, Car, GraduationCap, Building, Plane } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { PlaneIcon, Hotel, Bus, Train, Calendar, Film, Pizza, Wallet } from 'lucide-react';
import ServicesDashboard from '@/components/shared/ServicesDashboard';

const ThirdParty = () =>{

  const navigate = useNavigate();
  
//   const services = [
//     { id: 'electricity', name: 'Electricity', icon: Zap, color: 'bg-yellow-500' },
//     { id: 'fastag', name: 'FASTag Recharge', icon: Car, color: 'bg-orange-500' },
//     { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: 'bg-blue-500' },
//     { id: 'dth', name: 'DTH & Broadband', icon: Tv, color: 'bg-purple-500' },
//     { id: 'gas', name: 'Gas Bill', icon: FlameKindling, color: 'bg-green-500' },
//     { id: 'rent', name: 'Rent Payment', icon: Building2, color: 'bg-pink-500' },
//     { id: 'water', name: 'Water Bill', icon: Droplets, color: 'bg-blue-400' },
//     { id: 'insurance', name: 'Insurance Premium', icon: Shield, color: 'bg-indigo-500' },
//     { id: 'credit-card', name: 'Credit Card', icon: CreditCard, color: 'bg-red-500' },
//     { id: 'education', name: 'School/College Fee', icon: GraduationCap, color: 'bg-cyan-500' },
//     { id: 'municipal', name: 'Municipal Services', icon: Building, color: 'bg-lime-500' },
//     { id: 'housing', name: 'Housing Society', icon: Building2, color: 'bg-emerald-500' }
//   ];
  
const thirdPartyFeatures = [
    { id: 'flight-booking', name: 'Book Flights', icon: PlaneIcon, color: 'bg-blue-600' },
    { id: 'hotel-booking', name: 'Book Hotels', icon: Hotel, color: 'bg-indigo-500' },
    { id: 'bus-booking', name: 'Book Bus Tickets', icon: Bus, color: 'bg-teal-500' },
    { id: 'train-booking', name: 'Book Train Tickets', icon: Train, color: 'bg-yellow-500' },
    { id: 'event-booking', name: 'Book Events', icon: Calendar, color: 'bg-orange-500' },
    { id: 'movie-booking', name: 'Book Movie Tickets', icon: Film, color: 'bg-purple-600' },
    { id: 'food-ordering', name: 'Order Food', icon: Pizza, color: 'bg-pink-500' },
    { id: 'recharge-bill-payment', name: 'Recharge & Pay Bills', icon: CreditCard, color: 'bg-red-500' },
    { id: 'upi-wallet', name: 'UPI Payments & Wallet', icon: Wallet, color: 'bg-green-500' }
  ];
  
  const extraDetailsTravel = {
    title: "Other Services",
    subTitle: "Other services",
    merchant1: "IndiGo Airlines",
    amount1: "4500",
    merchant2: "Taj Hotels",
    amount2: "6200",
    icon1: Plane,
    icon2: Hotel,
    service1: "Flight Ticket",
    service2: "Hotel Booking"
  };
  const handleServiceClick = (id: string , name:string) => {
    // In a real app, this would navigate to the specific service page
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

  return (
   <ServicesDashboard services={thirdPartyFeatures} handleServiceClick={handleServiceClick} extraDetails={extraDetailsTravel}/>

  );
}
export default ThirdParty