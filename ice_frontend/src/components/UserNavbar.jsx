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
    <nav className="fixed top-0 w-full bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-xl font-bold text-pink-600 cursor-pointer"
            >
              IceCream Delight
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="promotions"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-pink-600"
              offset={-70}
              className="text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              Promotions
            </Link>
            <Link
              to="products"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-pink-600"
              offset={-70}
              className="text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              Products
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-pink-600"
              offset={-70}
              className="text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              About
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              activeClass="text-pink-600"
              offset={-70}
              className="text-gray-700 hover:text-pink-600 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}
              className="text-gray-700 hover:text-pink-600 relative"
            >
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-2 p-4">
              <Link
                to="home"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="promotions"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                Promotions
              </Link>
              <Link
                to="products"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                Products
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                About
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-pink-600 cursor-pointer"
              >
                Contact Us
              </Link>
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