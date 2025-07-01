import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const UserNavbar = ({ setIsCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart ? cart.length : 0;

  return (
    <nav className='sticky top-0 bg-white z-10 shadow-sm'>
      <div className='container hidden lg:block'>
        <div className='flex justify-between items-center p-4'>
          <div className='text-4xl font-medium ml-5'>
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-3xl font-bold text-[#FF9149] cursor-pointer"
            >
              IceLab
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="promotions"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-orange-400"
              offset={-70}
              className="text-gray-600 hover:text-orange-400 cursor-pointer text-base transition-colors duration-300"
            >
              Promotions
            </Link>
            <Link
              to="products"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-orange-400"
              offset={-70}
              className="text-gray-600 hover:text-orange-400 cursor-pointer text-base transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-orange-400"
              offset={-70}
              className="text-gray-600 hover:text-orange-400 cursor-pointer text-base transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-orange-400"
              offset={-70}
              className="text-gray-600 hover:text-orange-400 cursor-pointer text-base transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-orange-400 hover:text-orange-500 transition-colors duration-300"
              title="View Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs text-white bg-orange-400 rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-orange-400 hover:text-orange-500 focus:outline-none transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div>
              {['home', 'promotions', 'products', 'about', 'contact'].map((item) => (
                <Link
                  key={item}
                  to={item}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-600 hover:text-orange-400 cursor-pointer text-lg transition-colors duration-300 py-2"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-orange-400 hover:text-orange-500 cursor-pointer text-lg transition-colors duration-300 py-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;