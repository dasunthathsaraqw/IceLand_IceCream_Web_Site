import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import 'animate.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inquiryData = {
      ...formData,
      cartItems: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      })),
      totalAmount: getTotal(),
    };

    try {
      await axios.post('http://localhost:5000/api/inquiry', inquiryData);
      setStatus('Inquiry sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      setStatus('Failed to send inquiry. Please try again.');
      console.error('Error sending inquiry:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate__animated animate__fadeIn animate__faster">
      <div className="bg-[#FFECDB] rounded-lg shadow-xl w-full max-w-4xl h-[90vh] mx-auto my-4 flex flex-col">
        {/* Header */}
        <div className="bg-[#FF9149] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#FFFFFF] hover:text-[#E07B39] transition-colors duration-200 text-xl font-bold"
          >
            ×
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-2 flex items-center">
            <span className="mr-2">🛒</span> Your Cart
          </h2>
          <p className="text-[#FFFFFF]/80 text-xs sm:text-sm">Review your items and send inquiry</p>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF9149] scrollbar-track-[#FFECDB] space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-8 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-[#4A2C0D] text-sm font-medium mb-2">Your cart is empty</p>
              <p className="text-[#4A2C0D]/80 text-xs">Add some items to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={item.product._id} 
                    className="bg-[#FFECDB] rounded-lg p-4 border border-[#FF9149]/30 shadow-sm hover:shadow-md transition-shadow duration-200 animate__animated animate__fadeInUp"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#4A2C0D] text-sm truncate">{item.product.name}</h3>
                        <p className="text-[#4A2C0D]/80 text-xs">Unit Price: ${item.product.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-[#FF9149] hover:text-[#E07B39] transition-colors duration-200 p-1 hover:bg-[#FF9149]/10 rounded-full"
                        title="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-medium text-[#4A2C0D]">Quantity:</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                          className="w-16 p-1 border border-[#FF9149]/30 rounded-lg text-center text-xs font-semibold focus:border-[#FF9149] focus:outline-none transition-colors duration-200 bg-[#FFFFFF]/50"
                          min="1"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#FF9149]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-[#FF9149] rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#FFFFFF] font-semibold text-sm">Total Amount:</span>
                  <span className="text-[#FFFFFF] font-bold text-lg">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#FFECDB] rounded-lg p-6 border border-[#FF9149]/30 shadow-sm">
                <h3 className="text-lg font-semibold text-[#FF9149] mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Contact Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[#4A2C0D] font-medium text-xs mb-2">
                      Full Name <span className="text-[#FF9149]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF9149]/30 rounded-lg focus:border-[#FF9149] focus:outline-none transition-colors duration-200 bg-[#FFFFFF]/50 text-xs"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A2C0D] font-medium text-xs mb-2">
                      Email Address <span className="text-[#FF9149]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF9149]/30 rounded-lg focus:border-[#FF9149] focus:outline-none transition-colors duration-200 bg-[#FFFFFF]/50 text-xs"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A2C0D] font-medium text-xs mb-2">
                      Phone Number <span className="text-[#4A2C0D]/80">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF9149]/30 rounded-lg focus:border-[#FF9149] focus:outline-none transition-colors duration-200 bg-[#FFFFFF]/50 text-xs"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#FF9149] text-[#FFFFFF] py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#E07B39] transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      📨 Send Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-[#FF9149] text-[#FF9149] rounded-lg text-sm font-semibold hover:bg-[#FF9149] hover:text-[#FFFFFF] transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Status Message */}
                {status && (
                  <div className={`mt-4 p-2 rounded-lg text-center text-xs font-medium bg-[#FFECDB] border border-[#FF9149]/30 text-[#4A2C0D] animate__animated animate__fadeIn animate__delay-1s`}>
                    {status.includes('successfully') ? '✅ ' : '❌ '}
                    {status}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;