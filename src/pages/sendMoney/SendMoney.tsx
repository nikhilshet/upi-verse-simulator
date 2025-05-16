
import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Users, History as HistoryIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContactsContext, Contact } from '@/contexts/ContactsContext';
import { useLocation, useNavigate } from 'react-router-dom';
import SendMoneyAmount from './SendMoneyAmount';
import EnterPINModal from '@/components/shared/EnterPINModal';
import PaymentProcessing from '@/components/shared/PaymentProcessing';
import PaymentSuccess from '@/components/shared/PaymentSuccess';
import { useAppContext } from '@/contexts/AppContext';

interface Merchant {
  id: string;
  name: string;
  upiId: string;
  image: string;
  amount?: number;
}

enum Step {
  SELECT_CONTACT = 'select-contact',
  ENTER_AMOUNT = 'enter-amount',
  ENTER_PIN = 'enter-pin',
  PROCESSING = 'processing',
  SUCCESS = 'success'
}

const SendMoney = () => {
  const { contacts } = useContactsContext();
  const location = useLocation();
  const navigate = useNavigate();
  const {isOnEnterPin , setIsOnEnterPin} = useAppContext()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<Step>(Step.SELECT_CONTACT);
  useEffect(() => {
    // Check if we have merchant data from the scan QR flow
    if (location.state?.merchant) {
      const merchantData = location.state.merchant;
      setMerchant(merchantData);
      setAmount(merchantData.amount || 0);
      setCurrentStep(Step.ENTER_AMOUNT);
    }
  }, [location.state]);
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.phone.includes(searchQuery)
  );

  const recentContacts = contacts.filter(contact => contact.recent);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentStep(Step.ENTER_AMOUNT);
  };

  const handleAmountConfirm = (amount: number) => {
    setAmount(amount);
    setCurrentStep(Step.ENTER_PIN);
  };

  const handlePinSuccess = () => {
    setCurrentStep(Step.PROCESSING);
    // Simulate processing delay
    setTimeout(() => {
      setCurrentStep(Step.SUCCESS);
    }, 4000);
  };

  const handleBack = () => {
    if (currentStep === Step.ENTER_AMOUNT) {
      if (merchant) {
        // If coming from merchant flow, go back to home instead
        navigate('/');
      } else {
        setCurrentStep(Step.SELECT_CONTACT);
      }
    }
  };

  const handleNewPayment = () => {
    setSelectedContact(null);
    setMerchant(null);
    setAmount(0);
    
    // If we came from scan QR, navigate home
    if (location.state?.merchant) {
      navigate('/');
    } else {
      setCurrentStep(Step.SELECT_CONTACT);
    }
  };
  if(currentStep === Step.ENTER_PIN){
    setIsOnEnterPin(true)
  }else{
    setIsOnEnterPin(false)
  }
  if (currentStep === Step.ENTER_PIN) {
    return (
      <EnterPINModal 
        onSuccess={handlePinSuccess}
        onCancel={() => setCurrentStep(Step.ENTER_AMOUNT)}
        amount={amount}
        recipient={merchant ? merchant.name : selectedContact?.name || ''}
        />
    );
  }

  if (currentStep === Step.PROCESSING) {
    return <PaymentProcessing 
          amount={amount}
          recipient={merchant ? merchant.name : selectedContact?.name || ''}
    />;
  }

  if (currentStep === Step.SUCCESS) {
    return (
      <PaymentSuccess
        amount={amount}
        recipient={merchant ? merchant.name : selectedContact?.name || ''}
        onDone={handleNewPayment}
      />
    );
  }

  if (currentStep === Step.ENTER_AMOUNT) {
    if (merchant) {
      // Render merchant payment screen
      return (
        <SendMoneyAmount
          merchant={merchant}
          onBack={handleBack}
          onConfirm={handleAmountConfirm}
          initialAmount={merchant.amount}
        />
      );
    } else if (selectedContact) {
      // Render contact payment screen
      return (
        <SendMoneyAmount
          contact={selectedContact}
          onBack={handleBack}
          onConfirm={handleAmountConfirm}
        />
      );
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Send Money</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <Input
          className="pl-10 py-6 text-base"
          placeholder="Search by name or phone number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="recents" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="recents" className="flex-1">
            <HistoryIcon size={16} className="mr-2" />
            Recents
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex-1">
            <Users size={16} className="mr-2" />
            Contacts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recents">
          <div className="space-y-4">
            {recentContacts.length > 0 ? (
              recentContacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onSelect={handleContactSelect}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent contacts found
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="contacts">
          <div className="space-y-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onSelect={handleContactSelect}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No contacts found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ContactCardProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onSelect }) => {
  return (
    <button
      className="w-full flex items-center justify-between p-4 rounded-lg border"
      onClick={() => onSelect(contact)}
    >
      <div className="flex items-center">
        <img
          src={contact.image}
          alt={contact.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div className="text-left">
          <p className="font-medium">{contact.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{contact.upiId}</p>
        </div>
      </div>
      <ArrowRight size={16} className="text-gray-400" />
    </button>
  );
};

export default SendMoney;
