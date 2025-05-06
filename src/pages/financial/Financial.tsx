
import React from 'react';
import { LineChart, Banknote, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Financial = () => {
  const navigate = useNavigate();
  
  const mutualFunds = [
    { id: 'mf1', name: 'Blue Chip Fund', returns: '12.5%', risk: 'Moderate', minAmount: 500 },
    { id: 'mf2', name: 'Small Cap Fund', returns: '16.2%', risk: 'High', minAmount: 1000 },
    { id: 'mf3', name: 'Debt Fund', returns: '7.8%', risk: 'Low', minAmount: 100 }
  ];
  
  const insurancePlans = [
    { id: 'ins1', name: 'Health Insurance', coverage: '₹5 Lakhs', premium: '₹2,499/year' },
    { id: 'ins2', name: 'Term Life Insurance', coverage: '₹50 Lakhs', premium: '₹5,999/year' },
    { id: 'ins3', name: 'Vehicle Insurance', coverage: 'Comprehensive', premium: '₹3,799/year' }
  ];
  
  const loans = [
    { id: 'loan1', name: 'Personal Loan', interest: '10.5%', maxAmount: '₹10 Lakhs' },
    { id: 'loan2', name: 'Home Loan', interest: '7.8%', maxAmount: '₹75 Lakhs' },
    { id: 'loan3', name: 'Vehicle Loan', interest: '9.2%', maxAmount: '₹15 Lakhs' }
  ];

  const handleAction = (type: string, item: any) => {
    toast({
      title: `${type} action initiated`,
      description: `You've selected ${item.name}`,
    });
  };

  return (
    <div className="flex flex-col pb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Financial Services</h1>
      
      {/* Mutual Funds Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-2">
            <LineChart size={20} className="text-upi-blue dark:text-upi-blue-light" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Mutual Funds
          </h2>
        </div>
        
        <div className="space-y-3">
          {mutualFunds.map((fund) => (
            <div 
              key={fund.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-1">
                    {fund.name}
                  </h3>
                  <div className="flex space-x-4">
                    <p className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Returns: </span>
                      <span className="text-upi-status-success">{fund.returns}</span>
                    </p>
                    <p className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Risk: </span>
                      <span>{fund.risk}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">Min: ₹{fund.minAmount}</p>
                  <button 
                    onClick={() => handleAction('Investment', fund)}
                    className="text-xs bg-upi-blue text-white px-3 py-1 rounded-full"
                  >
                    Invest via UPI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Insurance Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-2">
            <Shield size={20} className="text-upi-green dark:text-upi-green-light" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Insurance
          </h2>
        </div>
        
        <div className="space-y-3">
          {insurancePlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex space-x-4">
                    <p className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Coverage: </span>
                      <span>{plan.coverage}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium mb-1">{plan.premium}</p>
                  <button 
                    onClick={() => handleAction('Insurance', plan)}
                    className="text-xs bg-upi-green text-white px-3 py-1 rounded-full"
                  >
                    Pay via UPI
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Loans Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-2">
            <Banknote size={20} className="text-upi-blue-dark dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Loans
          </h2>
        </div>
        
        <div className="space-y-3">
          {loans.map((loan) => (
            <div 
              key={loan.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-1">
                    {loan.name}
                  </h3>
                  <div className="flex space-x-4">
                    <p className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Interest: </span>
                      <span>{loan.interest}</span>
                    </p>
                    <p className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Max: </span>
                      <span>{loan.maxAmount}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => handleAction('Loan', loan)}
                    className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Financial;
