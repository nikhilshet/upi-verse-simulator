import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LucideCamera, X, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAppContext } from '../../contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import SendMoneyAmount from '../sendMoney/SendMoneyAmount';
import { Contact, useContactsContext } from '@/contexts/ContactsContext';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
enum ScanState {
  SCANNING = 'scanning',
  PROCESSING = 'processing',
  ENTER_AMOUNT = 'enter-amount',
  ENTER_PIN = 'enter-pin',
  SUCCESS = 'success'
}
interface Merchant {
  id: string;
  name: string;
  upiId: string;
  image: string;
  amount?: number;
}

interface SendMoneyAmountProps {
  contact?: Contact;
  merchant?: Merchant;
  onBack: () => void;
  onConfirm: (amount: number) => void;
  initialAmount?: number;
}

//body
const ScanQR = () => {
  const contact = useContactsContext()

  const { user , setIsOnEnterPin } = useAppContext();
  const navigate = useNavigate();
    const location = useLocation();
  
  const [scanState, setScanState] = useState<ScanState>(ScanState.SCANNING);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(contact.contacts[2]);
    const [merchant, setMerchant] = useState<Merchant | null>(null);
    const [amount, setAmount] = useState<number>(0);
  if(scanState === ScanState.ENTER_PIN){
    setIsOnEnterPin(true)
  }else{
    setIsOnEnterPin(false)

  }
  const handleClose = () => {
    setScanState(ScanState.SCANNING)

    navigate(-1);
  };
  const handleBack = () => {
    if (scanState === ScanState.ENTER_AMOUNT) {
      if (merchant) {
        // If coming from merchant flow, go back to home instead
        navigate('/');
      } else {
        setScanState(ScanState.SCANNING);;
      }
    }
  };

  const handleAmountConfirm = (amount: number) => {
    setAmount(amount);
    setScanState(ScanState.ENTER_PIN);
  };

  const handlePinSuccess = () => {
    setScanState(ScanState.PROCESSING);
    // Simulate processing delay
    setTimeout(() => {
      setScanState(ScanState.SUCCESS);
    }, 4000);
  };

  const handleNewPayment = () => {
    setSelectedContact(null);
    setMerchant(null);
    setAmount(0);
    
    navigate('/');
    
  };

  // useEffect(()=>{
  //   console.log("in use effect")
  //   const timer = setTimeout(()=>{
  //     console.log("scan successfull")
  //     setScanState(ScanState.ENTER_AMOUNT);
  //     console.log("After 5 seconds" , scanState)
  //   },3000)
  // },[])
  // useEffect(() => {
  //   if (scanState === ScanState.PROCESSING) {
  //     const timer = setTimeout(() => {
  //       toast({
  //         title: "QR Scanned Successfully",
  //         description: "Redirecting to payment page...",
  //       });
        
  //       // Simulate redirect to payment page with merchant details
  //       setTimeout(() => {
  //         console.log("navigate happeninng")
  //         navigate('/send-money', { 
  //           state: { 
  //             merchant: {
  //               id: 'merchant123',
  //               name: 'Coffee Shop',
  //               upiId: 'coffeeshop@okicici',
  //               image: 'https://cdn-icons-png.flaticon.com/512/772/772839.png',
  //               amount: 120
  //             }
  //           }
  //         });
  //       }, 1500);
  //     }, 4000);
      
  //     return () => clearTimeout(timer);
  //   }
//   // }, [scanState, navigate]);

//   if(scanState === ScanState.ENTER_AMOUNT){
//     return(
//       <SendMoneyAmount
//         contact={selectedContact}
//         onBack={handleBack}
//         onConfirm={handleAmountConfirm}
//       />
//     )
//   }
//   if(scanState === ScanState.PROCESSING){
//     return <PaymentProcessing
//     amount={amount}
//     recipient={merchant ? merchant.name : selectedContact?.name || ''}
// />;
//   }

//   if(scanState === ScanState.ENTER_PIN){
//     return(
//       <EnterPINModal
//         onSuccess={handlePinSuccess}
//         onCancel={() => setScanState(ScanState.ENTER_AMOUNT)}
//         amount={amount}
//         recipient={merchant ? merchant.name : selectedContact?.name || ''}
//       />
//     )
//   }
//   if(scanState === ScanState.SUCCESS){
//     return (
//       <PaymentSuccess
//         amount={amount}
//         recipient={merchant ? merchant.name : selectedContact?.name || ''}
//         onDone={handleNewPayment}
//       />
//     );
//   }

  const simulateQRScan = () => {
    setScanState(ScanState.PROCESSING);
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
          {scanState === ScanState.SCANNING && (
            <>
              <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                <div className="absolute inset-0 border-t-2 border-upi-blue animate-scan" />
              </div>
              <p className="text-white mt-4 text-center px-8">
                Point your camera at a QR code
              </p>
            </>
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
        
        <style>
          {`
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
          `}
        </style>
      </div>
    );
  
 
};

export default ScanQR;
