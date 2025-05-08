
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowDownLeft, RefreshCw, Check, QrCode, Smartphone, Zap, SmartphoneCharging } from 'lucide-react';
import { useContactsContext } from '@/contexts/ContactsContext';
import { Badge } from '@/components/ui/badge';

const FeatureGrid = () => {
  const navigate = useNavigate();
  const { pendingRequests } = useContactsContext();
  
  const activePendingRequestsCount = pendingRequests.filter(req => req.status === 'pending').length;
  
  const features = [
    { id: 'send', name: 'Send Money', icon: Send, path: '/send-money' },
    { id: 'request', name: 'Request Money', icon: ArrowDownLeft, path: '/request-money' },
    { id: 'self', name: 'Self Transfer', icon: RefreshCw, path: '/self-transfer' },
    { 
      id: 'approve', 
      name: 'Approve Request', 
      icon: Check, 
      path: '/approve-request',
      badge: activePendingRequestsCount > 0 ? activePendingRequestsCount : null
    },
    { id: 'scan', name: 'Scan & Pay', icon: QrCode, path: '/scan-qr' },
    { id: 'tap', name: 'Tap to Pay', icon: Smartphone, path: '/tap-to-pay' },
    { id: 'lite', name: 'UPI Lite', icon: Zap, path: '/upi-lite' },
    {id:'recharge' , name:'Mobile Recharge' , icon:SmartphoneCharging ,path:'/bbps/mobile'}
  ];
  
  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-3 bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/90">
      {features.map((feature) => (
        <button
          key={feature.id}
          className="flex flex-col items-center justify-between p-3 relative"
          onClick={() => handleFeatureClick(feature.path)}
        >
          <div className="w-12 h-12 rounded-full bg-gray-100/80 dark:bg-gray-700/80 flex items-center justify-center mb-2 relative">
            <feature.icon className="h-5 w-5 text-upi-blue dark:text-upi-blue-light" />
            {feature.badge && (
              <Badge 
                className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs"
              >
                {feature.badge}
              </Badge>
            )}
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
