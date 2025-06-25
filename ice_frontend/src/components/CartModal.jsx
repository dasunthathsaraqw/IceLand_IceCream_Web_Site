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
      setFormData({ name: '', email: '', phone: '' }); // Reset form
    } catch (error) {
      setStatus('Failed to send inquiry. Please try again.');
      console.error('Error sending inquiry:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product._id} className="flex justify-between items-center mb-2">
                <span>{item.product.name} (x{item.quantity})</span>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                    className="w-16 p-1 border rounded mr-2"
                    min="1"
                  />
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <p className="mt-4 text-gray-800 font-medium">Total: ${getTotal().toFixed(2)}</p>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-2">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
              >
                Send Inquiry
              </button>
            </form>
            {status && <p className="mt-2 text-center text-green-600">{status}</p>}
            <button
              onClick={onClose}
              className="mt-2 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
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