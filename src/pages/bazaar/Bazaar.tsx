
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Bazaar = () => {
  const { user } = useAppContext();
  
  const categories = [
    {
      id: 'footwear',
      name: 'Footwear',
      icon: 'footwear',
      products: [
        { id: 'p1', name: 'Running Shoes', price: 2499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
        { id: 'p2', name: 'Casual Sneakers', price: 1899, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77' },
        { id: 'p3', name: 'Formal Shoes', price: 3299, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' }
      ]
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: 'electronics',
      products: [
        { id: 'p4', name: 'Wireless Earbuds', price: 1999, image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605' },
        { id: 'p5', name: 'Smart Watch', price: 3499, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a' },
        { id: 'p6', name: 'Bluetooth Speaker', price: 2499, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab' }
      ]
    },
    {
      id: 'health',
      name: 'Health & Fitness',
      icon: 'health-fitness',
      products: [
        { id: 'p7', name: 'Yoga Mat', price: 899, image: 'https://images.unsplash.com/photo-1552693673-1bf958298935' },
        { id: 'p8', name: 'Fitness Band', price: 1499, image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288' },
        { id: 'p9', name: 'Protein Supplement', price: 1299, image: 'https://images.unsplash.com/photo-1579722820248-59cc4fb0af4e' }
      ]
    }
  ];

  const handleBuy = (product: any) => {
    toast({
      title: "Product added to cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="flex flex-col pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">UPI Bazaar</h1>
        <div className="relative">
          <ShoppingBag className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-upi-blue text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            0
          </span>
        </div>
      </div>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {category.name}
          </h2>
          
          <div className="flex overflow-x-auto hide-scrollbar pb-2 gap-4">
            {category.products.map((product) => (
              <div 
                key={product.id}
                className="flex-none w-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                <div
                  className="h-36 bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image}?w=160&h=144&fit=crop&auto=format)` }}
                ></div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 dark:text-white text-sm mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    ₹{product.price}
                  </p>
                  <button
                    className="w-full py-1 px-3 bg-upi-blue text-white text-xs rounded-md hover:bg-upi-blue-dark"
                    onClick={() => handleBuy(product)}
                  >
                    Pay with UPI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
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

export default Bazaar;
