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
    <>
      {/* Animated background blur effects */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute -top-5 right-20 w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-25 blur-lg animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-2 left-1/3 w-20 h-20 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-15 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 backdrop-blur-md bg-opacity-95 shadow-2xl z-20 border-b border-blue-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-lg"
              >
                ✨ Ice Land
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <Link
                to="promotions"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-orange-500 scale-110"
                offset={-70}
                className="text-blue-700 hover:text-orange-500 cursor-pointer font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg relative group"
              >
                Promotions
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="products"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-orange-500 scale-110"
                offset={-70}
                className="text-blue-700 hover:text-orange-500 cursor-pointer font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg relative group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-orange-500 scale-110"
                offset={-70}
                className="text-blue-700 hover:text-orange-500 cursor-pointer font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-orange-500 scale-110"
                offset={-70}
                className="text-blue-700 hover:text-orange-500 cursor-pointer font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg relative group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}
                className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-full font-medium hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <span>Cart</span>
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-blue-700 hover:text-orange-500 focus:outline-none transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gradient-to-b from-blue-700 to-blue-800 backdrop-blur-md border-t border-blue-400/20 rounded-b-lg shadow-xl">
              <div className="flex flex-col space-y-1 p-4">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 cursor-pointer py-3 px-2 rounded-lg hover:bg-blue-600/50 transition-all duration-300"
                >
                  🏠 Home
                </Link>
                <Link
                  to="promotions"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 cursor-pointer py-3 px-2 rounded-lg hover:bg-blue-600/50 transition-all duration-300"
                >
                  🎉 Promotions
                </Link>
                <Link
                  to="products"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 cursor-pointer py-3 px-2 rounded-lg hover:bg-blue-600/50 transition-all duration-300"
                >
                  🍦 Products
                </Link>
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 cursor-pointer py-3 px-2 rounded-lg hover:bg-blue-600/50 transition-all duration-300"
                >
                  ℹ️ About
                </Link>
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 cursor-pointer py-3 px-2 rounded-lg hover:bg-blue-600/50 transition-all duration-300"
                >
                  📞 Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <ErrorBoundary>
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </ErrorBoundary>
      </nav>
    </>
  );
};

export default UserNavbar;