import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaTruck, FaShoppingCart, FaArrowRight, FaStar } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaLeaf className="text-3xl" />,
      title: 'Farm Fresh',
      description: 'Directly from farms to your doorstep. Fresh vegetables and fruits every day.'
    },
    {
      icon: <FaTruck className="text-3xl" />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 24-48 hours. Quick and reliable service.'
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: 'Easy Shopping',
      description: 'Browse, select, and order from multiple farmers. One-click checkout.'
    }
  ];

  const topFarmers = [
    { id: 1, name: 'Green Valley Farm', rating: 4.8, orders: 250 },
    { id: 2, name: 'Organic Harvest', rating: 4.7, orders: 180 },
    { id: 3, name: 'Fresh Fields', rating: 4.9, orders: 320 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Fresh Produce, Directly From Farmers
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Buy fresh vegetables and fruits directly from local farmers. No middlemen, just pure quality produce delivered to your doorstep.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-lg bg-white text-primary-600 hover:bg-neutral-100 font-bold"
                >
                  <span className="flex items-center gap-2">
                    Get Started <FaArrowRight />
                  </span>
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <span className="flex items-center gap-2">
                    Browse Products <FaArrowRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1488459716781-8d54d7d64549?w=600&h=600&fit=crop"
                alt="Fresh Products"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose FreshFarm?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Farmers Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-16">Top Rated Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topFarmers.map((farmer) => (
              <div key={farmer.id} className="card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mb-4"></div>
                <h3 className="text-2xl font-bold mb-2">{farmer.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold">{farmer.rating}</span>
                  <span className="text-neutral-600">({farmer.orders} orders)</span>
                </div>
                <button className="btn btn-primary btn-sm w-full">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to eat fresh?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of customers who are already enjoying fresh, organic produce from local farmers.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-lg bg-white text-primary-600 hover:bg-neutral-100 font-bold"
          >
            <span className="flex items-center gap-2">
              Start Shopping Now <FaArrowRight />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
