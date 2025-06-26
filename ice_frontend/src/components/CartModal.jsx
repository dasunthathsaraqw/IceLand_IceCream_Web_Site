import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

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
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">🛒 Your Cart</h2>
          <p className="text-white/80 text-sm">Review your items and send inquiry</p>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400">Add some items to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div 
                    key={item.product._id} 
                    className="bg-gradient-to-r from-[#FFECDB] to-[#AFDDFF]/20 rounded-xl p-4 border-l-4 border-[#FF9149] shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm">Unit Price: ${item.product.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 hover:bg-red-50 rounded-full"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Quantity:</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                          className="w-20 p-2 border-2 border-[#AFDDFF] rounded-lg text-center font-semibold focus:border-[#60B5FF] focus:outline-none transition-colors duration-200"
                          min="1"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#FF9149]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">Total Amount:</span>
                  <span className="text-white font-bold text-2xl">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-[#FFECDB] to-white rounded-xl p-6 border border-[#AFDDFF]/30">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Contact Information
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-[#AFDDFF] rounded-lg focus:border-[#60B5FF] focus:outline-none transition-colors duration-200 bg-white/80"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-[#AFDDFF] rounded-lg focus:border-[#60B5FF] focus:outline-none transition-colors duration-200 bg-white/80"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-[#AFDDFF] rounded-lg focus:border-[#60B5FF] focus:outline-none transition-colors duration-200 bg-white/80"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#FF9149] to-[#FF9149]/90 text-white py-3 px-6 rounded-lg font-semibold hover:from-[#FF9149]/90 hover:to-[#FF9149] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      📨 Send Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border-2 border-[#60B5FF] text-[#60B5FF] rounded-lg font-semibold hover:bg-[#60B5FF] hover:text-white transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Status Message */}
                {status && (
                  <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                    status.includes('successfully') 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
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