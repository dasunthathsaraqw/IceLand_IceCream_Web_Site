import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    const inquiryData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      cartItems: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      })),
      totalAmount: getTotal(),
    };

    try {
      await axios.post(`http://localhost:5000/api/inquiries`, inquiryData);
      setStatus('Inquiry sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', message: '' });
      // Optionally clear cart after submission
      // cart.forEach(item => removeFromCart(item.product._id));
    } catch (error) {
      setStatus('Failed to send inquiry. Please try again.');
      console.error('Error sending inquiry:', error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative border border-blue-200/50 transform transition-all duration-300 scale-100"
      >
        {/* Decorative blur elements */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-40 blur-sm"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-30 blur-sm"></div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-blue-700 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-h-[calc(70vh-200px)] overflow-y-auto mb-6 pr-2">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center mb-4 p-4 bg-blue-100/50 rounded-lg border border-blue-200/30"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-blue-800 font-semibold">{item.product.name}</h3>
                      <p className="text-blue-600 text-sm">
                        ${item.product.price} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                      className="w-16 p-2 border-2 border-blue-200 rounded-lg focus:border-orange-400 focus:outline-none bg-white/80 text-blue-800"
                      min="1"
                    />
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-blue-800 font-semibold text-lg mb-6">
              Total: ${getTotal().toFixed(2)}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 bg-white/80"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 bg-white/80"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-blue-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 bg-white/80"
                  rows="4"
                  placeholder="Include any special requests..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gradient-to-r from-green-400 to-green-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 hover:scale-105 hover:-translate-y-1'
                } text-white shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Inquiry</span>
                )}
              </button>
            </form>
            {status && (
              <p
                className={`mt-4 text-center text-lg font-medium ${
                  status.includes('successfully') ? 'text-green-600' : 'text-red-600'
                } animate-fade-in`}
              >
                {status}
              </p>
            )}
            <button
              onClick={onClose}
              className="w-full mt-4 py-3 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;