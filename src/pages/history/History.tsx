
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Filter } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const History = () => {
  const { transactions } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const navigate = useNavigate()
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'send', name: 'Send' },
    { id: 'receive', name: 'Receive' },
    { id: 'recharge', name: 'Recharge' },
    { id: 'bill', name: 'Bills' },
    { id: 'shopping', name: 'Shopping' }
  ];

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === activeFilter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-upi-status-success';
      case 'pending':
        return 'text-upi-status-pending';
      case 'failed':
        return 'text-upi-status-failed';
      default:
        return 'text-gray-500';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return '↑';
      case 'receive':
        return '↓';
      case 'recharge':
        return '📱';
      case 'bill':
        return '📄';
      case 'shopping':
        return '🛍️';
      default:
        return '•';
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Transaction History</h1>
      
      <div className="flex overflow-x-auto hide-scrollbar pb-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-full text-sm mr-2 whitespace-nowrap ${
              activeFilter === filter.id 
                ? 'bg-upi-blue text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
              <div 
              key={tx.id}
              className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
              onClick={()=>navigate(`/history/${tx.id}`)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                  <span className="text-lg">{getTransactionIcon(tx.type)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{tx.recipient}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(tx.date)} • {tx.category || tx.type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.type === 'receive' ? 'text-upi-status-success' : ''}`}>
                  {tx.type === 'receive' ? '+' : '-'} ₹{tx.amount}
                </p>
                <p className={`text-xs ${getStatusColor(tx.status)}`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No transactions found matching your filters.
          </div>
        )}
      </div>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default History;
