
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus , ClipboardList , Calculator , BarChart2 , Repeat , ShieldCheck , RotateCcw , FileText , HelpCircle} from 'lucide-react';
import { useContactsContext } from '@/contexts/ContactsContext';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const FeatureGrid = () => {
  const navigate = useNavigate();
  const { pendingRequests } = useContactsContext();
  
  const activePendingRequestsCount = pendingRequests.filter(req => req.status === 'pending').length;
  
  // const features = [
  //   { id: 'send', name: 'Send Money', icon: Send, path: '/send-money' },
  //   { id: 'request', name: 'Request Money', icon: ArrowDownLeft, path: '/request-money' },
  //   { id: 'self', name: 'Self Transfer', icon: RefreshCw, path: '/self-transfer' },
  //   { 
  //     id: 'approve', 
  //     name: 'Approve Request', 
  //     icon: Check, 
  //     path: '/approve-request',
  //     badge: activePendingRequestsCount > 0 ? activePendingRequestsCount : null
  //   },
  //   { id: 'scan', name: 'Scan & Pay', icon: QrCode, path: '/scan-qr' },
  //   { id: 'tap', name: 'Tap to Pay', icon: Smartphone, path: '/tap-to-pay' },
  //   { id: 'circle', name: 'UPI Circle', icon: "/upi.svg", path: '/upi-circle' },
  //   {id:'recharge' , name:'Mobile Recharge' , icon:SmartphoneCharging ,path:'/bbps/mobile'}
  // ];
  // 
  const nbfcLendingInsuranceFeatures = [
    { id: 'apply-loan', name: 'Apply for Loan', icon: FilePlus, color: 'bg-blue-600', path: '/apply-loan' },
    { id: 'loan-tracking', name: 'Loan Status & EMI', icon: ClipboardList, color: 'bg-indigo-500', path: '/loan-status' },
    { id: 'loan-calculator', name: 'EMI Calculator', icon: Calculator, color: 'bg-teal-500', path: '/emi-calculator' },
    { id: 'credit-check', name: 'Credit Score Check', icon: BarChart2, color: 'bg-yellow-500', path: '/credit-score' },
    { id: 'loan-repayment', name: 'Loan Repayment', icon: Repeat, color: 'bg-orange-500', path: '/loan-repayment' },
    { id: 'insurance-plans', name: 'Insurance Plans', icon: ShieldCheck, color: 'bg-purple-600', path: '/insurance-plans' },
    { id: 'insurance-renewal', name: 'Renew Insurance', icon: RotateCcw, color: 'bg-pink-500', path: '/insurance-renewal' },
    { id: 'claims', name: 'Insurance Claims', icon: FileText, color: 'bg-red-500', path: '/claims' },
  ];
  

  
  const handleFeatureClick = (path: string , name:string ) => {
    if(path === "/send-money" || path === "/scan-qr" || path === "/approve-request"){
      navigate(path);
    }else{
       toast({
            title: "Coming Soon",
            description: `${name} Feature Coming Soon`,
        });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-3 bg-[#81B1CD1A] shadow-lg dark:bg-gray-800/90 rounded-xl border border-gray-100 dark:border-gray-800/90">
      {nbfcLendingInsuranceFeatures.map((feature) => (
        <button
          key={feature.id}
          className="flex flex-col items-center justify-between p-3 relative"
          onClick={() => handleFeatureClick(feature.path , feature.name)}
        >
          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700/80 flex items-center justify-center mb-2 relative">
          { feature.id === 'circle' ? <img src={`${feature.icon}`}/> : <feature.icon className="h-6 w-6 text-upi-blue dark:text-upi-blue-light" />}
            {/* {feature.badge && (
              <Badge 
                className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs"
              >
                {feature.badge}
              </Badge>
            )
            } */}
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300 text-center font-medium">
            {feature.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FeatureGrid;
