
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  phone: string;
  email: string;
  selectedSim: string;
  selectedBank: string;
  upiPin: string;
  balance: number;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'recharge' | 'bill' | 'shopping';
  amount: number;
  recipient: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
  category?: string;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get dark mode preference from localStorage if exists
  const storedDarkMode = typeof window !== 'undefined' ? 
    localStorage.getItem('darkMode') === 'true' : false;
  
  const [darkMode, setDarkMode] = useState<boolean>(storedDarkMode);
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isPinSet, setIsPinSet] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'send',
      amount: 500,
      recipient: 'Rahul Sharma',
      date: '2023-06-02',
      status: 'success'
    },
    {
      id: '2',
      type: 'receive',
      amount: 1200,
      recipient: 'Priya Patel',
      date: '2023-06-01',
      status: 'success'
    },
    {
      id: '3',
      type: 'bill',
      amount: 850,
      recipient: 'Electricity Board',
      date: '2023-05-28',
      status: 'success',
      category: 'Electricity'
    },
    {
      id: '4',
      type: 'recharge',
      amount: 299,
      recipient: 'Airtel',
      date: '2023-05-25',
      status: 'success',
      category: 'Mobile'
    },
    {
      id: '5',
      type: 'shopping',
      amount: 1999,
      recipient: 'Amazon',
      date: '2023-05-22',
      status: 'success',
      category: 'Electronics'
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
      setIsPinSet
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
