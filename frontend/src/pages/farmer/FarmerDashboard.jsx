import React from 'react';
import { FaChartLine, FaBoxOpen, FaMoneyBillWave } from 'react-icons/fa';

const FarmerDashboard = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Farmer Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-primary-600">245</p>
              </div>
              <FaChartLine className="text-4xl text-primary-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Products Listed</p>
                <p className="text-3xl font-bold text-secondary-600">28</p>
              </div>
              <FaBoxOpen className="text-4xl text-secondary-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">₹45,000</p>
              </div>
              <FaMoneyBillWave className="text-4xl text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <p className="text-neutral-600">
            Farmer dashboard will show product management, order management, analytics, and revenue tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
