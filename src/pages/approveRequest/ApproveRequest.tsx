
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactsContext, PendingRequest } from '@/contexts/ContactsContext';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
import { toast } from '@/hooks/use-toast';

enum Step {
  VIEW_REQUESTS = 'view-requests',
  ENTER_PIN = 'enter-pin',
  PROCESSING = 'processing',
  SUCCESS = 'success'
}

const ApproveRequest = () => {
  const { pendingRequests, setPendingRequests } = useContactsContext();
  const [currentRequest, setCurrentRequest] = useState<PendingRequest | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>(Step.VIEW_REQUESTS);

  const handleApprove = (request: PendingRequest) => {
    setCurrentRequest(request);
    setCurrentStep(Step.ENTER_PIN);
  };

  const handleReject = (request: PendingRequest) => {
    // Update request status to rejected
    setPendingRequests(prevRequests => 
      prevRequests.map(r => 
        r.id === request.id ? { ...r, status: 'rejected' } : r
      )
    );
    
    toast({
      title: "Request Rejected",
      description: `You've declined the payment request from ${request.from.name}.`,
    });
  };

  const handlePinSuccess = () => {
    setCurrentStep(Step.PROCESSING);
    
    // Simulate processing delay
    setTimeout(() => {
      // Update request status to approved
      if (currentRequest) {
        setPendingRequests(prevRequests => 
          prevRequests.map(r => 
            r.id === currentRequest.id ? { ...r, status: 'approved' } : r
          )
        );
      }
      setCurrentStep(Step.SUCCESS);
    }, 4000);
  };

  const handleDone = () => {
    setCurrentStep(Step.VIEW_REQUESTS);
    setCurrentRequest(null);
  };

  if (currentStep === Step.ENTER_PIN && currentRequest) {
    return (
      <EnterPINModal 
        onSuccess={handlePinSuccess}
        onCancel={() => setCurrentStep(Step.VIEW_REQUESTS)}
      />
    );
  }

  if (currentStep === Step.PROCESSING) {
    return <PaymentProcessing />;
  }

  if (currentStep === Step.SUCCESS && currentRequest) {
    return (
      <PaymentSuccess
        amount={currentRequest.amount}
        recipient={currentRequest.from.name}
        onDone={handleDone}
      />
    );
  }

  const activePendingRequests = pendingRequests.filter(req => req.status === 'pending');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Requests</h1>
      
      {activePendingRequests.length > 0 ? (
        <div className="space-y-6">
          {activePendingRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onApprove={() => handleApprove(request)}
              onReject={() => handleReject(request)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No pending requests</p>
          <p className="text-sm text-gray-400">Requests from your contacts will appear here</p>
        </div>
      )}
    </div>
  );
};

interface RequestCardProps {
  request: PendingRequest;
  onApprove: () => void;
  onReject: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onApprove, onReject }) => {
  const { from, amount, reason, timestamp } = request;
  
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
  
  const formattedTime = new Date(timestamp).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <img
            src={from.image}
            alt={from.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold">{from.name}</h3>
            <p className="text-xs text-gray-500">{formattedTime}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Amount</p>
          <p className="text-2xl font-bold">{formattedAmount}</p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">Description</p>
          <p className="font-medium">{reason}</p>
        </div>
        
        <div className="flex space-x-4">
          <Button
            onClick={onReject}
            variant="outline"
            className="flex-1 py-6 border border-gray-300 hover:bg-gray-50 dark:border-gray-600"
          >
            <X size={16} className="mr-2" /> Decline
          </Button>
          
          <Button
            onClick={onApprove}
            className="flex-1 py-6 bg-upi-green hover:bg-upi-green-dark"
          >
            <Check size={16} className="mr-2" /> Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequest;
