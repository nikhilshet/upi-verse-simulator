
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowDownLeft, RefreshCw, Check, QrCode, Smartphone, Zap } from 'lucide-react';

const FeatureGrid = () => {
  const navigate = useNavigate();
  
  const features = [
    { id: 'send', name: 'Send Money', icon: Send, path: '/send-money' },
    { id: 'request', name: 'Request Money', icon: ArrowDownLeft, path: '/request-money' },
    { id: 'self', name: 'Self Transfer', icon: RefreshCw, path: '/self-transfer' },
    { id: 'approve', name: 'Approve Request', icon: Check, path: '/approve-request' },
    { id: 'scan', name: 'Scan & Pay', icon: QrCode, path: '/scan-qr' },
    { id: 'tap', name: 'Tap to Pay', icon: Smartphone, path: '/tap-to-pay' },
    { id: 'lite', name: 'UPI Lite', icon: Zap, path: '/upi-lite' }
  ];
  
  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {features.map((feature) => (
        <button
          key={feature.id}
          className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:border-upi-blue dark:hover:border-upi-blue-light transition-all"
          onClick={() => handleFeatureClick(feature.path)}
        >
          <div className="w-12 h-12 rounded-full bg-gray-100/80 dark:bg-gray-700/80 flex items-center justify-center mb-2">
            <feature.icon className="h-5 w-5 text-upi-blue dark:text-upi-blue-light" />
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
