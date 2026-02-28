import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaSync } from 'react-icons/fa';
import { productAPI } from '../utils/api';

const ProductInventory = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'in_stock', 'low_stock', 'out_of_stock'

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getInventoryStatus();
      if (response.success) {
        setInventory(response.data);
      }
    } catch (err) {
      setError('Failed to fetch inventory: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1"><FaCheckCircle /> In Stock</span>;
      case 'low_stock':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1"><FaExclamationTriangle /> Low Stock</span>;
      case 'out_of_stock':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1"><FaTimesCircle /> Out of Stock</span>;
      default:
        return null;
    }
  };

  const getFilteredProducts = () => {
    if (!inventory) return [];
    if (filter === 'all') return inventory.products;
    return inventory.products.filter(p => p.status === filter);
  };

  if (loading) return <div className="text-center py-8">Loading inventory...</div>;

  if (!inventory) return <div className="text-center py-8">No inventory data</div>;

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card border-l-4 border-blue-500">
          <p className="text-neutral-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-blue-600">{inventory.totalProducts}</p>
        </div>

        <div className="card border-l-4 border-green-500">
          <p className="text-neutral-600 text-sm mb-1">Active Products</p>
          <p className="text-3xl font-bold text-green-600">{inventory.activeProducts}</p>
        </div>

        <div className="card border-l-4 border-orange-500">
          <p className="text-neutral-600 text-sm mb-1">Low Stock</p>
          <p className="text-3xl font-bold text-orange-600">{inventory.lowStockProducts}</p>
        </div>

        <div className="card border-l-4 border-red-500">
          <p className="text-neutral-600 text-sm mb-1">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600">{inventory.outOfStockProducts}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { label: 'All Products', value: 'all' },
          { label: 'In Stock', value: 'in_stock' },
          { label: 'Low Stock', value: 'low_stock' },
          { label: 'Out of Stock', value: 'out_of_stock' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded font-semibold transition ${
              filter === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={fetchInventory}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-500 text-white rounded hover:bg-neutral-600 disabled:opacity-50"
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Product Inventory Table */}
      {filteredProducts.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-neutral-600">
            {filter === 'all' ? 'No products found' : `No ${filter.replace('_', ' ')} products`}
          </p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-neutral-50">
                <th className="text-left px-4 py-3 font-semibold">Product Name</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Available</th>
                <th className="text-right px-4 py-3 font-semibold">Sold</th>
                <th className="text-right px-4 py-3 font-semibold">Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-neutral-50 transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{product.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="text-right px-4 py-3">
                    <span className={`font-bold ${
                      product.quantity === 0
                        ? 'text-red-600'
                        : product.quantity <= 5
                        ? 'text-orange-600'
                        : 'text-green-600'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="text-right px-4 py-3 text-neutral-600">
                    {product.sold}
                  </td>
                  <td className="text-right px-4 py-3 font-semibold">
                    ₹{product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Alert for out of stock products */}
      {inventory.outOfStockProducts > 0 && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded">
          <p className="text-orange-800">
            ⚠️ You have <strong>{inventory.outOfStockProducts}</strong> out of stock products. 
            These products will not be visible to customers.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductInventory;
