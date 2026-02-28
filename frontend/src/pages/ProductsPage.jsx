import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { addToCart } from '../redux/slices/cartSlice';
import { FaShoppingCart, FaStar, FaFilter, FaTimes, FaLeaf } from 'react-icons/fa';

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Herbs', 'Other'];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12
      };

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await productAPI.getAllProducts(params);
      
      if (response.success) {
        setProducts(response.data || []);
        setTotalPages(response.pages || 1);
        setError('');
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const handleQuantityChange = (productId, value) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = selectedQuantities[product._id] || 1;

    if (quantity > product.quantity_available) {
      alert(`Only ${product.quantity_available} units available`);
      return;
    }

    dispatch(addToCart({
      _id: product._id,
      product_id: product._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      weight: product.weight,
      weight_unit: product.weight_unit,
      quality: product.quality,
      category: product.category,
      image_url: product.image_url,
      farmer_id: product.farmer_id,
      quantity: quantity,
      quantity_available: product.quantity_available
    }));

    // Reset quantity for this product
    setSelectedQuantities(prev => ({
      ...prev,
      [product._id]: 1
    }));

    // Show success message
    alert('Added to cart!');
  };

  if (loading && products.length === 0) {
    return <div className="section-padding text-center">Loading products...</div>;
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Fresh Farm Products</h1>
          <p className="text-neutral-600">Browse and buy fresh products directly from farmers</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-6 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="card sticky top-4">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h3 className="font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <FaTimes />
                </button>
              </div>

              <h3 className="font-bold mb-4 hidden lg:block">Categories</h3>

              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === ''
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-neutral-100'
                  }`}
                >
                  All Categories
                </button>

                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg"
            >
              <FaFilter /> Filters
            </button>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">No products found</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map(product => (
                    <div key={product._id} className="card overflow-hidden hover:shadow-lg transition">
                      {/* Product Image */}
                      <div className="relative h-48 bg-neutral-200 overflow-hidden cursor-pointer"
                           onClick={() => navigate(`/product/${product._id}`)}>
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-neutral-100">
                            <FaLeaf className="text-4xl text-neutral-300" />
                          </div>
                        )}

                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {product.category}
                        </span>

                        {/* Organic Badge */}
                        {product.is_organic && (
                          <span className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <FaLeaf /> Organic
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 h-12 overflow-hidden">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <FaStar className="text-yellow-500" />
                          <span className="font-semibold">{product.rating}/5</span>
                          <span className="text-sm text-neutral-600">({product.total_reviews})</span>
                        </div>

                        {/* Product Info */}
                        <div className="text-sm text-neutral-600 mb-3">
                          <p>{product.weight} {product.weight_unit} • {product.quality}</p>
                          <p className="text-xs">Quantity: {product.quantity_available} {product.unit} available</p>
                        </div>

                        {/* Farmer Info */}
                        {product.farmer_id && (
                          <div className="text-xs text-neutral-600 mb-3 pb-3 border-b">
                            <p className="font-semibold">{product.farmer_id?.farm_name}</p>
                          </div>
                        )}

                        {/* Price and Cart */}
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-2xl font-bold text-primary-600">₹{product.price}</p>
                            <p className="text-xs text-neutral-500">per {product.unit}</p>
                          </div>
                        </div>

                        {/* Quantity Selector and Add to Cart */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-neutral-700">Qty:</label>
                            <input
                              type="number"
                              min="1"
                              max={product.quantity_available}
                              value={selectedQuantities[product._id] || 1}
                              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                              className="w-16 px-2 py-1 border border-neutral-300 rounded text-sm"
                            />
                            <span className="text-xs text-neutral-600">max {product.quantity_available}</span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.quantity_available === 0}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo(0, 0);
                        }}
                        className={`px-4 py-2 rounded ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'border border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
