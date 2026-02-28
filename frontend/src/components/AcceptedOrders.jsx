import React, { useState, useEffect, useCallback } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { orderAPI } from '../utils/api';

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const fetchMyOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders(activeTab);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err) {
      setError('Failed to fetch orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      const response = await orderAPI.updateDeliveryStatus(orderId, {
        order_status: newStatus,
      });
      if (response.success) {
        alert(`Order marked as ${newStatus}!`);
        fetchMyOrders();
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'text-blue-600';
      case 'picked_up':
        return 'text-purple-600';
      case 'in_transit':
        return 'text-orange-600';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      assigned: 'Assigned',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      delivered: 'Delivered',
    };
    return statusMap[status] || status;
  };

  if (loading) return <div className="text-center py-8">Loading your orders...</div>;

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-neutral-600'
          }`}
        >
          Active Orders
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'completed'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-neutral-600'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'all'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-neutral-600'
          }`}
        >
          All Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-neutral-600">
            {activeTab === 'active'
              ? 'No active orders'
              : activeTab === 'completed'
              ? 'No completed orders'
              : 'No orders yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card">
              {/* Header with Order Number and Status */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <h3 className="font-bold text-lg">{order.order_number}</h3>
                  <p className={`font-semibold ${getStatusColor(order.order_status)}`}>
                    Status: {getStatusText(order.order_status)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.total_price}</p>
                  <p className="text-sm text-green-600 font-semibold">
                    +₹{order.delivery_charge} (your earning)
                  </p>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Items */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FaBox className="text-orange-500" />
                    Items ({order.items.length})
                  </h4>
                  <div className="text-sm space-y-1 max-h-32 overflow-y-auto">
                    {order.items.map((item) => (
                      <p key={item._id} className="text-neutral-600">
                        {item.product_name} × {item.quantity} {item.unit}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                    <FaMapMarkerAlt /> Pickup From
                  </h4>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">
                      {order.farmer_id?.user_id?.name || 'Farmer'}
                    </p>
                    <p className="text-neutral-600">{order.farmer_id?.farm_name}</p>
                    <p className="text-neutral-600">
                      {order.delivery_address?.city}
                    </p>
                    {order.farmer_id?.user_id?.phone && (
                      <a
                        href={`tel:${order.farmer_id.user_id.phone}`}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FaPhoneAlt className="text-xs" />
                        {order.farmer_id.user_id.phone}
                      </a>
                    )}
                  </div>
                </div>

                {/* Delivery Location */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
                    <FaTruck /> Deliver To
                  </h4>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">
                      {order.consumer_id?.user_id?.name || 'Customer'}
                    </p>
                    <p className="text-neutral-600">
                      {order.delivery_address?.street}
                    </p>
                    <p className="text-neutral-600">
                      {order.delivery_address?.city}, {order.delivery_address?.pincode}
                    </p>
                    {order.consumer_id?.user_id?.phone && (
                      <a
                        href={`tel:${order.consumer_id.user_id.phone}`}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FaPhoneAlt className="text-xs" />
                        {order.consumer_id.user_id.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Update Buttons */}
              {activeTab !== 'completed' && (
                <div className="flex gap-2 mt-4 pt-4 border-t flex-wrap">
                  {order.order_status === 'assigned' && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, 'picked_up')}
                      disabled={updatingStatus === order._id}
                      className="btn-secondary text-sm"
                    >
                      {updatingStatus === order._id ? 'Updating...' : 'Mark as Picked Up'}
                    </button>
                  )}
                  {order.order_status === 'picked_up' && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, 'in_transit')}
                      disabled={updatingStatus === order._id}
                      className="btn-secondary text-sm"
                    >
                      {updatingStatus === order._id ? 'Updating...' : 'Mark as In Transit'}
                    </button>
                  )}
                  {order.order_status === 'in_transit' && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, 'delivered')}
                      disabled={updatingStatus === order._id}
                      className="btn-primary text-sm flex items-center gap-2"
                    >
                      <FaCheckCircle />
                      {updatingStatus === order._id ? 'Updating...' : 'Mark as Delivered'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
