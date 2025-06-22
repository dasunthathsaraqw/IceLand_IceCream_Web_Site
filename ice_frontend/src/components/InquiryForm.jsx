import React, { useState } from 'react';
import axios from 'axios';

const InquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const inquiryData = {
      ...formData,
    };

    try {
      await axios.post('http://localhost:5000/api/inquiry', inquiryData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setStatus('error');
      console.error('Error sending inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-200/40 via-orange-200/30 to-yellow-200/40 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-300/10 to-orange-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            💬 Contact Us
          </h2>
          <p className="text-xl text-blue-700/80 font-medium">We'd love to hear from you!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Glassmorphism form container */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-orange-400 to-yellow-400 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
            
            <form onSubmit={handleSubmit} className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                      👤 Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/60 backdrop-blur-sm border-2 border-white/40 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                      📧 Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/60 backdrop-blur-sm border-2 border-white/40 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 text-lg">
                    <span className="bg-gradient-to-r from-yellow-600 to-blue-500 bg-clip-text text-transparent">
                      💌 Message
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/60 backdrop-blur-sm border-2 border-white/40 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50 focus:border-yellow-400 transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                    rows="5"
                    placeholder="Tell us about your inquiry, special requests, or bulk orders..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-500 hover:from-blue-600 hover:via-orange-600 hover:to-yellow-600 hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      '🚀 Send Inquiry'
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="mt-6 p-4 bg-green-100/80 backdrop-blur-sm border-2 border-green-300/50 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">✅</span>
                      <p className="text-green-700 font-semibold">
                        Inquiry sent successfully! We will contact you soon.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-6 p-4 bg-red-100/80 backdrop-blur-sm border-2 border-red-300/50 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">❌</span>
                      <p className="text-red-700 font-semibold">
                        Failed to send inquiry. Please try again.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold text-blue-700 mb-2">Visit Us</h3>
              <p className="text-gray-700 text-sm">123 Sweet Street<br/>Ice Cream City</p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-orange-700 mb-2">Call Us</h3>
              <p className="text-gray-700 text-sm">+1 (555) 123-4567<br/>Mon-Fri 9AM-6PM</p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">🕒</div>
              <h3 className="font-bold text-yellow-700 mb-2">Hours</h3>
              <p className="text-gray-700 text-sm">Daily: 10AM-9PM<br/>Weekends: 9AM-10PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;