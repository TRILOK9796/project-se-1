import React, { useState } from 'react';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaTruck, FaChartBar } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 70000 },
  ];

  const orderData = [
    { name: 'Pending', value: 120, color: '#f59e0b' },
    { name: 'Confirmed', value: 450, color: '#3b82f6' },
    { name: 'In Transit', value: 280, color: '#10b981' },
    { name: 'Delivered', value: 1850, color: '#06b6d4' },
  ];

  const categoryData = [
    { name: 'Vegetables', orders: 450 },
    { name: 'Fruits', orders: 380 },
    { name: 'Dairy', orders: 290 },
    { name: 'Grains', orders: 210 },
    { name: 'Herbs', orders: 160 },
  ];

  const stats = [
    {
      label: 'Total Users',
      value: '2,450',
      icon: FaUsers,
      color: 'primary',
      change: '+12.5%'
    },
    {
      label: 'Total Orders',
      value: '2,700',
      icon: FaShoppingCart,
      color: 'blue',
      change: '+8.2%'
    },
    {
      label: 'Revenue',
      value: '₹3.2L',
      icon: FaMoneyBillWave,
      color: 'green',
      change: '+15.3%'
    },
    {
      label: 'Active Deliveries',
      value: '280',
      icon: FaTruck,
      color: 'yellow',
      change: '+5.1%'
    },
  ];

  return (
    <div className="section-padding bg-neutral-50 min-h-screen">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button className="btn btn-primary">Export Report</button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-neutral-300">
          {['overview', 'orders', 'users', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-green-600 text-sm mt-1">{stat.change}</p>
                      </div>
                      <Icon className={`text-4xl text-${stat.color}-500 opacity-20`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Status Chart */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Orders by Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {orderData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Chart */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Orders by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
            <p className="text-neutral-600">
              Orders management section with filtering, search, and detailed order information.
            </p>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Users Management</h2>
            <p className="text-neutral-600">
              User management section for farmers, consumers, and delivery partners with verification and status control.
            </p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Analytics & Reports</h2>
            <p className="text-neutral-600">
              Detailed analytics, KPIs, performance metrics, and exportable reports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
