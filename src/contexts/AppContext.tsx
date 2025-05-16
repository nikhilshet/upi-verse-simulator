
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  phone: string;
  email: string;
  selectedSim: string;
  selectedBank: string;
  upiPin: string;
  balance: number;
  editable : boolean;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'recharge' | 'bill' | 'shopping';
  amount: number;
  recipient: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
  category?: string;
  phone : string,
  transactionId: string,
  upiTransactionId: string,
  from: { upi: string, bank: string},
  to: { upi: string, bank: string },
  bankName: string
}

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  user: User | null;
  setUser: (user: User) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  isPinSet: boolean;
  setIsPinSet: (isPinSet: boolean) => void;
  isOnEnterPin:boolean 
  setIsOnEnterPin :(isOnEnterPin:boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get dark mode preference from localStorage if exists
  const storedDarkMode = typeof window !== 'undefined' ? 
    localStorage.getItem('darkMode') === 'true' : false;
  
  const [darkMode, setDarkMode] = useState<boolean>(storedDarkMode);
const [user, setUser] = useState<User>({ name: "Rahul Sharma",
  phone: "9876543210",
  email: "rahul@gmail.com",
  selectedSim: "Sim1",
  selectedBank: "SBI",
  upiPin: "1234",
  balance: 12000,
  editable : false});
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [isOnEnterPin , setIsOnEnterPin] = useState<boolean>(false);
  const [isPinSet, setIsPinSet] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'send',
      amount: 500,
      recipient: 'Rahul Sharma',
      date: '2023-06-02',
      status: 'success',
      phone: '+91-9876543210',
      transactionId: 'TXN123456001',
      upiTransactionId: 'UPI0001RAHUL',
      from: { upi: 'user@upi', bank: 'HDFC Bank' },
      to: { upi: 'rahulsharma@icici', bank: 'ICICI Bank' },
      bankName: 'HDFC Bank'
    },
    {
      id: '2',
      type: 'receive',
      amount: 1200,
      recipient: 'Priya Patel',
      date: '2023-06-01',
      status: 'success',
      phone: '+91-9123456780',
      transactionId: 'TXN123456002',
      upiTransactionId: 'UPI0002PRIYA',
      from: { upi: 'priyapatel@ybl', bank: 'SBI' },
      to: { upi: 'user@upi', bank: 'HDFC Bank' },
      bankName: 'HDFC Bank'
    },
    {
      id: '3',
      type: 'bill',
      amount: 850,
      recipient: 'Electricity Board',
      date: '2023-05-28',
      status: 'success',
      category: 'Electricity',
      phone: '+91-1800123456',
      transactionId: 'TXN123456003',
      upiTransactionId: 'UPI0003ELEC',
      from: { upi: 'user@upi', bank: 'Axis Bank' },
      to: { upi: 'electricity@billdesk', bank: 'BillDesk' },
      bankName: 'Axis Bank'
    },
    {
      id: '4',
      type: 'recharge',
      amount: 299,
      recipient: 'Airtel',
      date: '2023-05-25',
      status: 'success',
      category: 'Mobile',
      phone: '+91-9876543201',
      transactionId: 'TXN123456004',
      upiTransactionId: 'UPI0004AIRTEL',
      from: { upi: 'user@upi', bank: 'Kotak Mahindra Bank' },
      to: { upi: 'airtel@paytm', bank: 'Paytm Payments Bank' },
      bankName: 'Kotak Mahindra Bank'
    },
    {
      id: '5',
      type: 'shopping',
      amount: 1999,
      recipient: 'Amazon',
      date: '2023-05-22',
      status: 'success',
      category: 'Electronics',
      phone: '+91-180030009009',
      transactionId: 'TXN123456005',
      upiTransactionId: 'UPI0005AMAZON',
      from: { upi: 'user@upi', bank: 'ICICI Bank' },
      to: { upi: 'amazon@icici', bank: 'ICICI Bank' },
      bankName: 'ICICI Bank'
    },
    {
      id: '6',
      type: 'send',
      amount: 250,
      recipient: 'Karan Mehta',
      date: '2023-06-03',
      status: 'success',
      phone: '+91-9012345678',
      transactionId: 'TXN123456006',
      upiTransactionId: 'UPI0006KARAN',
      from: { upi: 'user@upi', bank: 'Yes Bank' },
      to: { upi: 'karanmehta@oksbi', bank: 'SBI' },
      bankName: 'Yes Bank'
    },
    {
      id: '7',
      type: 'receive',
      amount: 700,
      recipient: 'Sneha Reddy',
      date: '2023-06-04',
      status: 'success',
      phone: '+91-9988776655',
      transactionId: 'TXN123456007',
      upiTransactionId: 'UPI0007SNEHA',
      from: { upi: 'snehareddy@upi', bank: 'Canara Bank' },
      to: { upi: 'user@upi', bank: 'HDFC Bank' },
      bankName: 'HDFC Bank'
    }
  ]);

  // Update localStorage and apply class when darkMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
      
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  const handleDarkMode = (mode: boolean) => {
    setDarkMode(mode);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      darkMode, 
      setDarkMode: handleDarkMode, 
      user, 
      setUser, 
      isOnboarded, 
      setIsOnboarded, 
      transactions, 
      addTransaction,
      isPinSet,
      setIsPinSet,
      isOnEnterPin , 
      setIsOnEnterPin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
