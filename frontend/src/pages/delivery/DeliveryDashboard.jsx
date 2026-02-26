import React from 'react';
import { FaTruck, FaMapMarkerAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const DeliveryDashboard = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Delivery Partner Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Total Deliveries</p>
                <p className="text-3xl font-bold text-primary-600">342</p>
              </div>
              <FaTruck className="text-4xl text-primary-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Active Orders</p>
                <p className="text-3xl font-bold text-blue-600">3</p>
              </div>
              <FaMapMarkerAlt className="text-4xl text-blue-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Today's Earnings</p>
                <p className="text-3xl font-bold text-green-600">₹850</p>
              </div>
              <FaMoneyBillWave className="text-4xl text-green-500 opacity-20" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-2">Rating</p>
                <p className="text-3xl font-bold text-yellow-600">4.8/5</p>
              </div>
              <FaStar className="text-4xl text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Active Deliveries</h2>
          <p className="text-neutral-600">
            Delivery partner dashboard will show available orders, current deliveries, route optimization, earnings, and ratings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
