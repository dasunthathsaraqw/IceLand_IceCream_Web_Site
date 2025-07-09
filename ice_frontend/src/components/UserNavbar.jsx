import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const UserNavbar = ({ setIsCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart ? cart.length : 0;

  return (
    <nav className='sticky top-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 backdrop-blur-md z-50 shadow-lg relative'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-4xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            >
              Iceland
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', to: 'home' },
              { name: 'Promotions', to: 'promotions' },
              { name: 'Products', to: 'products' },
              { name: 'About', to: 'about' },
              { name: 'Contact', to: 'contact' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-white scale-110"
                offset={-70}
                className="relative text-white/90 hover:text-white cursor-pointer text-lg font-medium transition-all duration-300 hover:scale-105 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-white/30"
              title="View Cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover:animate-pulse" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/90 hover:text-white focus:outline-none transition-colors duration-300 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12"
          >
            <path
              d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
              fill="white"
              opacity="0.8"
            />
            <path
              d="M0,80 C300,120 600,40 900,80 C1050,100 1150,60 1200,80 L1200,120 L0,120 Z"
              fill="white"
              opacity="0.6"
            />
            <path
              d="M0,100 C200,120 400,80 600,100 C800,120 1000,80 1200,100 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl mx-4 mb-4 p-6 shadow-xl border border-white/20">
              {[
                { name: 'Home', to: 'home' },
                { name: 'Promotions', to: 'promotions' },
                { name: 'Products', to: 'products' },
                { name: 'About', to: 'about' },
                { name: 'Contact', to: 'contact' }
              ].map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-orange-500 cursor-pointer text-lg font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-orange-50 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full text-orange-500 hover:text-orange-600 cursor-pointer text-lg font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-orange-50 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({cartCount})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;