import React from 'react';
import { FaShoppingBag, FaTruck, FaHeart, FaWallet } from 'react-icons/fa';

const ConsumerDashboard = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-primary-600">12</p>
              </div>
              <FaShoppingBag className="text-4xl text-primary-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Active Orders</p>
                <p className="text-3xl font-bold text-blue-600">2</p>
              </div>
              <FaTruck className="text-4xl text-blue-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Saved Farmers</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <FaHeart className="text-4xl text-green-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-yellow-600">₹5,200</p>
              </div>
              <FaWallet className="text-4xl text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
          <p className="text-neutral-600">
            Consumer dashboard will show order history, active orders, saved farmers, wishlist, and account management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
