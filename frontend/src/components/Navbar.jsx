import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaLeaf } from 'react-icons/fa';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.user_type) {
      case 'farmer':
        return '/dashboard/farmer';
      case 'consumer':
        return '/dashboard/consumer';
      case 'delivery_partner':
        return '/dashboard/delivery';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gradient"
          >
            <FaLeaf className="text-green-600" />
            FreshFarm
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition"
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/products"
              className="text-neutral-700 hover:text-primary-600 transition"
            >
              Products
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-neutral-700 hover:text-primary-600 transition"
                >
                  Dashboard
                </Link>
                {user?.user_type === 'consumer' && (
                  <Link
                    to="/cart"
                    className="relative text-neutral-700 hover:text-primary-600 transition"
                  >
                    <FaShoppingCart className="text-xl" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2 text-neutral-700 hover:text-primary-600">
                    <FaUser /> {user?.name}
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 hover:bg-neutral-100"
                    >
                      My Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2 text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-outline"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link to="/" className="text-neutral-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" className="text-neutral-700 hover:text-primary-600">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-neutral-700 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-outline w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary w-full"
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;
