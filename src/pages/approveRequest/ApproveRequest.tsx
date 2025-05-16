
import React, { useState } from 'react';
import { Check, Clock3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactsContext, PendingRequest } from '@/contexts/ContactsContext';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
import { toast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

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
    const { user , setIsOnEnterPin } = useAppContext();
  
  const handleApprove = (request: PendingRequest) => {
    setCurrentRequest(request);
    setCurrentStep(Step.ENTER_PIN);
  };
  if(currentStep === Step.ENTER_PIN){
    setIsOnEnterPin(true)
  }else{
    setIsOnEnterPin(false)

  }
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
        amount= {459}
        recipient="Zomato"
      />
    );
  }

  if (currentStep === Step.PROCESSING) {
    return <PaymentProcessing
      amount={currentRequest.amount}
      recipient={currentRequest.from.name}
    />;
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
    <div className='mt-12'>
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
  const { from, amount, reason, timestamp , expires } = request;
  
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
        <div className="flex space-x-4 items-center">
          {/* <img
            src={from.image}
            alt={from.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          /> */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M 9 4.5 C 6.519 4.5 4.5 6.519 4.5 9 L 4.5 41 C 4.5 43.481 6.519 45.5 9 45.5 L 41 45.5 C 43.481 45.5 45.5 43.481 45.5 41 L 45.5 9 C 45.5 6.519 43.481 4.5 41 4.5 L 9 4.5 z M 36.228516 20.757812 L 35.996094 22.484375 L 37.259766 22.484375 C 37.219766 22.660375 37.067344 23.645219 37.027344 23.949219 L 35.796875 23.949219 L 35.515625 25.988281 C 35.443625 26.516281 35.48375 26.701172 35.84375 26.701172 C 36.11575 26.701172 36.508047 26.541875 36.748047 26.421875 L 36.53125 27.740234 C 36.20325 27.916234 35.588953 28.173828 34.876953 28.173828 C 33.668953 28.173828 33.419328 27.52425 33.611328 26.15625 L 33.923828 23.949219 L 33.324219 23.949219 L 33.492188 22.517578 L 34.140625 22.484375 L 34.388672 21.445312 L 36.228516 20.757812 z M 30.699219 22.214844 C 31.879457 22.196578 32.684875 22.675281 32.796875 23.613281 C 32.827875 23.900281 32.834922 24.204563 32.794922 24.476562 C 32.602922 25.804562 32.483547 26.803563 32.435547 27.476562 C 32.427547 27.580562 32.427547 27.757672 32.435547 28.013672 L 30.619141 28.013672 C 30.659141 27.909672 30.690656 27.765844 30.722656 27.589844 C 30.746656 27.469844 30.755484 27.324625 30.771484 27.140625 C 30.395484 27.668625 29.867125 27.988359 29.203125 28.068359 C 28.259125 28.188359 27.635172 27.813031 27.451172 26.957031 C 27.331172 26.421031 27.499297 25.813312 27.779297 25.445312 C 28.163297 24.965312 28.779063 24.660453 29.539062 24.564453 C 30.147063 24.492453 30.658672 24.525094 31.138672 24.621094 L 31.162109 24.541016 C 31.178109 24.413016 31.187875 24.277188 31.171875 24.117188 C 31.123875 23.717188 30.803531 23.468453 30.019531 23.564453 C 29.491531 23.628453 28.979891 23.821109 28.587891 24.037109 L 28.203125 22.884766 C 28.731125 22.580766 29.403875 22.349906 30.171875 22.253906 C 30.354875 22.230906 30.530613 22.217453 30.699219 22.214844 z M 40.261719 22.314453 C 41.853719 22.314453 42.638672 23.386297 42.638672 24.779297 C 42.637672 26.652297 41.308641 28.212891 39.556641 28.212891 C 37.980641 28.212891 37.181641 27.141234 37.181641 25.740234 C 37.181641 23.876234 38.516719 22.314453 40.261719 22.314453 z M 23.042969 22.371094 C 24.090969 22.371094 24.161203 23.203609 24.033203 24.099609 C 24.617203 23.019609 25.442937 22.371094 26.210938 22.371094 C 27.266937 22.371094 27.337172 23.227688 27.201172 24.179688 L 26.546875 27.964844 L 24.722656 27.964844 L 25.201172 24.619141 C 25.241172 24.291141 25.250328 24.044922 24.986328 24.044922 C 24.530328 24.044922 23.930922 24.931781 23.794922 25.675781 L 23.626953 26.828125 C 23.570953 27.236125 23.506047 27.692469 23.498047 27.980469 L 21.498047 27.980469 C 21.610047 27.500469 21.714547 26.739984 21.810547 26.083984 L 22.001953 24.787109 C 22.073953 24.307109 22.082359 24.052734 21.818359 24.052734 C 21.362359 24.052734 20.762953 24.939594 20.626953 25.683594 L 20.457031 26.835938 C 20.409031 27.243938 20.330266 27.700281 20.322266 27.988281 L 18.345703 27.988281 C 18.457703 27.508281 18.562203 26.747797 18.658203 26.091797 L 18.90625 24.419922 C 19.00225 23.787922 19.033766 23.115516 19.009766 22.603516 C 19.753766 22.587516 20.282625 22.531734 20.890625 22.427734 C 20.938625 22.603734 20.970359 23.443687 20.818359 24.179688 C 21.402359 23.051687 22.258969 22.371094 23.042969 22.371094 z M 15.912109 22.388672 C 17.488109 22.388672 18.265625 23.4445 18.265625 24.8125 C 18.264625 26.6615 16.960609 28.205078 15.224609 28.205078 C 13.672609 28.205078 12.871094 27.149625 12.871094 25.765625 C 12.871094 23.925625 14.191109 22.388672 15.912109 22.388672 z M 12.902344 22.515625 L 12.869141 23.53125 L 10.220703 26.412109 C 11.324703 26.412109 12.029688 26.404859 12.429688 26.380859 C 12.311687 26.924859 12.215141 27.372922 12.119141 28.044922 C 11.591141 27.996922 10.759734 27.988281 9.9277344 27.988281 C 8.9997344 27.988281 8.1919688 27.996922 7.5429688 28.044922 L 7.5664062 27.021484 L 10.214844 24.15625 C 9.0548437 24.15625 8.6303906 24.163687 8.1503906 24.179688 C 8.2543906 23.667687 8.33425 23.09925 8.40625 22.53125 C 9.25425 22.54725 9.5897344 22.564453 10.677734 22.564453 C 11.693734 22.564453 12.262344 22.547625 12.902344 22.515625 z M 15.712891 23.867188 C 15.200891 23.867188 14.783203 24.683219 14.783203 25.699219 C 14.783203 26.379219 15.008578 26.724609 15.392578 26.724609 C 15.904578 26.724609 16.304688 25.900578 16.304688 24.892578 C 16.304688 24.204578 16.080891 23.867187 15.712891 23.867188 z M 40.021484 23.867188 C 39.509484 23.867188 39.09375 24.683219 39.09375 25.699219 C 39.09375 26.379219 39.317172 26.724609 39.701172 26.724609 C 40.213172 26.724609 40.613281 25.900578 40.613281 24.892578 C 40.613281 24.204578 40.389484 23.867187 40.021484 23.867188 z M 30.525391 25.427734 C 30.335391 25.413734 30.131641 25.4135 29.931641 25.4375 C 29.547641 25.4855 29.226594 25.644953 29.058594 25.876953 C 28.930594 26.044953 28.866625 26.244562 28.890625 26.476562 C 28.930625 26.828563 29.323297 27.100922 29.779297 27.044922 C 30.451297 26.964922 30.907531 26.317734 31.019531 25.677734 L 31.035156 25.501953 C 30.891156 25.469953 30.715391 25.441734 30.525391 25.427734 z"></path>
</svg>
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
          <p className="font-medium text-sm">{reason}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">Expires</p>
          <div className='flex items-center'>
            <Clock3 size={15} className='mr-2 text-black dark:text-white'/>
          <p className="font-medium text-sm">{expires}</p>

          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button
            onClick={onReject}
            variant="outline"
            className="flex-1 text-md py-6 border border-gray-300 hover:bg-gray-50 dark:border-gray-600 hover:text-black"
          >
            <X size={16} className="mr-2" /> Decline
          </Button>
          
          <Button
            variant='glow'
            onClick={onApprove}
            className="text-white text-md flex-1 py-6"
          >
            <Check size={16} className="mr-2" /> Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveRequest;
