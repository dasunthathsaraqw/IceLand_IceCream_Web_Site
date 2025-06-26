import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import ErrorBoundary from './ErrorBoundary';

const UserNavbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart ? cart.length : 0;

  return (
    <nav className="fixed top-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-2xl font-bold text-[#FF9149] cursor-pointer font-poppins"
            >
              IceLand
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="promotions"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-[#FF9149] border-b-2 border-[#FF9149]"
              offset={-70}
              className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-base transition-colors duration-300"
            >
              Promotions
            </Link>
            <Link
              to="products"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-[#FF9149] border-b-2 border-[#FF9149]"
              offset={-70}
              className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-base transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-[#FF9149] border-b-2 border-[#FF9149]"
              offset={-70}
              className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-base transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-[#FF9149] border-b-2 border-[#FF9149]"
              offset={-70}
              className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-base transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-[#60B5FF] hover:text-[#FF9149] relative p-2 rounded-lg hover:bg-[#AFDDFF]/20 transition-all duration-300 group"
              title="View Cart"
            >
              {/* Shopping Cart Icon */}
              <svg 
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" 
                />
              </svg>
              
              {/* Cart Count Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF9149] to-[#FF9149]/90 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200 animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#60B5FF] hover:text-[#FF9149] focus:outline-none transition-colors duration-300 p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-br from-[#FFECDB] to-[#AFDDFF]/30 shadow-lg rounded-b-xl backdrop-blur-sm">
            <div className="flex flex-col space-y-4 p-6">
              <Link
                to="home"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50"
              >
                Home
              </Link>
              <Link
                to="promotions"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50"
              >
                Promotions
              </Link>
              <Link
                to="products"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50"
              >
                Products
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50"
              >
                About
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50"
              >
                Contact Us
              </Link>
              
              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 text-[#60B5FF] hover:text-[#FF9149] cursor-pointer font-poppins font-medium text-lg transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/50 border-t border-[#AFDDFF] mt-2 pt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <ErrorBoundary>
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </ErrorBoundary>
    </nav>
  );
};

export default UserNavbar;