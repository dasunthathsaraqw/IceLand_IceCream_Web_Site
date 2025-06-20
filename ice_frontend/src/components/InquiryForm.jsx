import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const InquiryForm = () => {
  const { cart, getTotal } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

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
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
    } catch (error) {
      setStatus('Failed to send inquiry. Please try again.');
      console.error('Error sending inquiry:', error);
    }
  };

  return (
    <section id="contact" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700">Phone (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Include any special requests..."
            />
          </div>
          {cart.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-pink-600">Your Order</h3>
              {cart.map((item) => (
                <p key={item.product._id} className="text-gray-600">
                  {item.product.name} (x{item.quantity}) - ${item.product.price * item.quantity}
                </p>
              ))}
              <p className="text-gray-800 font-medium">Total: ${getTotal().toFixed(2)}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
          >
            Send Inquiry
          </button>
          {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default InquiryForm;