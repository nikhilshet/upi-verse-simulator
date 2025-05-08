
import React, { createContext, useContext, ReactNode } from 'react';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  upiId: string;
  image: string;
  recent?: boolean;
}

interface ContactsContextType {
  contacts: Contact[];
  pendingRequests: PendingRequest[];
  setPendingRequests: React.Dispatch<React.SetStateAction<PendingRequest[]>>;
}

export interface PendingRequest {
  id: string;
  from: Contact;
  amount: number;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  expires : string
}

const defaultContacts: Contact[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '9876543210',
    upiId: 'rahul@okaxis',
    image: 'https://i.pravatar.cc/150?img=1',
    recent: true
  },
  {
    id: '2',
    name: 'Priya Singh',
    phone: '9876543211',
    upiId: 'priya@okicici',
    image: 'https://i.pravatar.cc/150?img=5',
    recent: true
  },
  {
    id: '3',
    name: 'Amit Kumar',
    phone: '9876543212',
    upiId: 'amit@oksbi',
    image: 'https://i.pravatar.cc/150?img=3',
    recent: false
  },
  {
    id: '4',
    name: 'Sneha Patel',
    phone: '9876543213',
    upiId: 'sneha@okhdfc',
    image: 'https://i.pravatar.cc/150?img=4',
    recent: true
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    phone: '9876543214',
    upiId: 'vikram@okybl',
    image: 'https://i.pravatar.cc/150?img=6',
    recent: false
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    phone: '9876543215',
    upiId: 'anjali@okpnb',
    image: 'https://i.pravatar.cc/150?img=9',
    recent: false
  },
];

const defaultPendingRequests: PendingRequest[] = [
  {
    id: '1',
    from: {
      id: '7',
      name: 'Zomato',
      phone: '1800208889',
      upiId: 'zomato@hdfcbank',
      image: 'https://logolook.net/wp-content/uploads/2023/04/Zomato-Logo.png',
    },
    amount: 459,
    reason: 'Food Order #ZMT12345',
    timestamp: new Date().toISOString(),
    status: 'pending',
    expires: new Date(new Date().getTime() + 15 * 60000).toISOString().slice(0, 16).replace('T', ' ')

  }
];

const ContactsContext = createContext<ContactsContextType>({
  contacts: defaultContacts,
  pendingRequests: defaultPendingRequests,
  setPendingRequests: () => {},
});

export const useContactsContext = () => useContext(ContactsContext);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pendingRequests, setPendingRequests] = React.useState<PendingRequest[]>(defaultPendingRequests);
  
  return (
    <ContactsContext.Provider value={{
      contacts: defaultContacts,
      pendingRequests,
      setPendingRequests,
    }}>
      {children}
    </ContactsContext.Provider>
  );
};
