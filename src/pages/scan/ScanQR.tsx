
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideCamera, X, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAppContext } from '../../contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const ScanQR = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  const handleClose = () => {
    navigate(-1);
  };

  const simulateQRScan = () => {
    setScanning(false);
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: "QR Scanned Successfully",
        description: "Redirecting to payment page...",
      });
      
      // Simulate redirect to payment page
      setTimeout(() => {
        navigate('/send-money', { state: { recipient: 'Coffee Shop', amount: 120 } });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <button 
          onClick={handleClose}
          className="bg-black bg-opacity-50 rounded-full p-2 text-white"
        >
          <X size={20} />
        </button>
        
        <button className="bg-black bg-opacity-50 rounded-full py-1 px-3 flex items-center text-white text-sm">
          {user?.selectedBank || 'Bank'} <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {scanning ? (
          <>
            <div className="w-64 h-64 border-2 border-white rounded-lg relative">
              <div className="absolute inset-0 border-t-2 border-upi-blue animate-scan" />
            </div>
            <p className="text-white mt-4 text-center px-8">
              Point your camera at a QR code
            </p>
            <Button 
              className="mt-4 bg-upi-blue"
              onClick={simulateQRScan}
            >
              Simulate QR Scan
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-upi-blue border-t-transparent animate-spin mb-4" />
            <p className="text-white">Processing QR code...</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-1">
              <LucideCamera size={20} className="text-white" />
            </div>
            <span className="text-white text-xs">Photo</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="white" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" stroke="white" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" stroke="white" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-white text-xs">Gallery</span>
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(100% - 2px));
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ScanQR;
