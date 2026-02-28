import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaTruck, FaUser, FaCog } from 'react-icons/fa';
import MyProfile from '../../components/MyProfile';
import ProfileSettings from '../../components/ProfileSettings';
import { authAPI } from '../../utils/api';

const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshProfile, setRefreshProfile] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [refreshProfile]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getUserProfile();
      if (response.success) {
        setUserProfile(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    setRefreshProfile(!refreshProfile);
  };

  if (loading) return <div className="section-padding text-center text-xl">Loading...</div>;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <p className="text-neutral-600">Welcome back, {userProfile?.name}! 👋</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FaUser /> My Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FaShoppingBag /> My Orders
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FaCog /> Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'profile' && (
            <div>
              <MyProfile showEditModal={true} onEditClick={() => setActiveTab('settings')} />
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">ORD-123456</p>
                      <p className="text-neutral-600 text-sm">3 items from Fresh Farm</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹850</p>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                        In Transit
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center py-8 text-neutral-600">
                  <p>No other orders yet. Start shopping!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <ProfileSettings 
                userProfile={userProfile} 
                onProfileUpdate={handleProfileUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
