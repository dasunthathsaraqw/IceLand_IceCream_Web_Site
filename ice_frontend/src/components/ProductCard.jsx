import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

// Add CSS animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out;
  }
`;

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value)));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      // Replace alert with a more elegant notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
      notification.textContent = `${product.name} added to cart!`;
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }, 800);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <style>{modalStyles}</style>
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-200/50 backdrop-blur-sm overflow-hidden group">
        {/* Decorative blur elements */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300"></div>

        {/* Product image with overlay effects */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Floating price badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            💰 ${product.price}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 leading-tight">
            🍦 {product.name}
          </h3>

          <p className="text-blue-700 mb-4 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-semibold text-lg">Price:</span>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold text-xl">
                ${product.price}
              </span>
            </div>

            {/* Category badge */}
            <div className="bg-blue-200/50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-300/30">
              {product.category}
            </div>
          </div>

          {product.category === 'Bulk Orders' && (
            <div className="mb-4 p-3 bg-blue-100/50 rounded-lg border border-blue-200/30">
              <label className="block text-blue-700 font-semibold mb-2 flex items-center space-x-2">
                <span>📦</span>
                <span>Quantity:</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors duration-300 bg-white/80 backdrop-blur-sm font-semibold text-blue-800"
                  min="1"
                  placeholder="Enter quantity"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10m-10 0V6a1 1 0 011-1h8a1 1 0 011 1v2m-10 4l1 7h8l1-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={openModal}
              className="w-full py-3 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              🔍 View Details
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3 px-6 rounded-xl font-bold text-lg transform transition-all duration-300 flex items-center justify-center space-x-2 ${
                isAdding
                  ? 'bg-gradient-to-r from-green-400 to-green-500 scale-95'
                  : 'bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 hover:scale-105 hover:-translate-y-1'
              } text-white shadow-lg hover:shadow-xl`}
            >
              {isAdding ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-transparent rounded-br-3xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-tl-3xl"></div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-orange-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Enhanced Modal with blur backdrop */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)'
          }}
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 relative border border-white/20 overflow-hidden transform transition-all duration-500 scale-100 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20" style={{background: 'linear-gradient(45deg, #ff6b6b, #feca57)', filter: 'blur(20px)'}}></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full opacity-15" style={{background: 'linear-gradient(45deg, #48cae4, #023e8a)', filter: 'blur(15px)'}}></div>
            <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full opacity-10" style={{background: 'linear-gradient(45deg, #f72585, #b5179e)', filter: 'blur(10px)'}}></div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
              }}
            >
              ✕
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                  🍦 {product.name}
                </h2>
                <div className="w-32 h-1 rounded-full mx-auto" style={{background: 'linear-gradient(90deg, #ff6b6b, #feca57)'}}></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                  </div>
                  
                  {/* Floating price badge */}
                  <div className="absolute top-4 left-4 text-white px-4 py-2 rounded-full text-lg font-bold shadow-xl" style={{background: 'linear-gradient(135deg, #ff6b6b, #feca57)'}}>
                    💰 ${product.price}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Description */}
                  <div className="p-5 rounded-xl border border-blue-200/30 shadow-sm" style={{background: 'linear-gradient(135deg, rgba(240, 248, 255, 0.8), rgba(219, 234, 254, 0.6))'}}>
                    <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                      <span className="mr-2">📝</span>
                      Description
                    </h3>
                    <p className="text-blue-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Product Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border border-orange-200/30 shadow-sm" style={{background: 'linear-gradient(135deg, rgba(255, 237, 213, 0.8), rgba(254, 215, 170, 0.6))'}}>
                      <div className="text-orange-600 font-semibold mb-2 flex items-center">
                        <span className="mr-2">💎</span>
                        Price
                      </div>
                      <div className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, #ff6b6b, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                        ${product.price}
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-xl border border-blue-200/30 shadow-sm" style={{background: 'linear-gradient(135deg, rgba(240, 248, 255, 0.8), rgba(219, 234, 254, 0.6))'}}>
                      <div className="text-blue-600 font-semibold mb-2 flex items-center">
                        <span className="mr-2">🏷️</span>
                        Category
                      </div>
                      <div className="text-lg font-semibold text-blue-800">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="p-5 rounded-xl border border-green-200/30 shadow-sm" style={{background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.8), rgba(209, 250, 229, 0.6))'}}>
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <span className="mr-2">⭐</span>
                      Product Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-green-700">
                        <span className="mr-2 text-green-500">✓</span>
                        Premium Quality
                      </div>
                      <div className="flex items-center text-green-700">
                        <span className="mr-2 text-green-500">✓</span>
                        Fresh Ingredients
                      </div>
                      <div className="flex items-center text-green-700">
                        <span className="mr-2 text-green-500">✓</span>
                        Fast Delivery
                      </div>
                      <div className="flex items-center text-green-700">
                        <span className="mr-2 text-green-500">✓</span>
                        Money Back Guarantee
                      </div>
                    </div>
                  </div>

                  {/* Quantity for Bulk Orders */}
                  {product.category === 'Bulk Orders' && (
                    <div className="p-5 rounded-xl border border-purple-200/30 shadow-sm" style={{background: 'linear-gradient(135deg, rgba(250, 245, 255, 0.8), rgba(237, 233, 254, 0.6))'}}>
                      <label className="block text-purple-700 font-semibold mb-4 flex items-center space-x-2">
                        <span>📦</span>
                        <span>Select Quantity:</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors duration-300 font-semibold text-purple-800 text-lg shadow-sm"
                          style={{background: 'rgba(255, 255, 255, 0.9)'}}
                          min="1"
                          placeholder="Enter quantity"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10m-10 0V6a1 1 0 011-1h8a1 1 0 011 1v2m-10 4l1 7h8l1-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transform transition-all duration-300 flex items-center justify-center space-x-3 text-white shadow-xl hover:shadow-2xl ${
                    isAdding ? 'scale-95' : 'hover:scale-105 hover:-translate-y-1'
                  }`}
                  style={{
                    background: isAdding 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #ff6b6b, #feca57)',
                    boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)'
                  }}
                >
                  {isAdding ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Adding to Cart...</span>
                    </>
                  ) : (
                    <>
                      <span>🛒</span>
                      <span>Add to Cart</span>
                      {product.category === 'Bulk Orders' && (
                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                          {quantity}x
                        </span>
                      )}
                    </>
                  )}
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 py-4 px-8 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2"
                  style={{
                    background: 'linear-gradient(135deg, #6b73ff, #9c88ff)',
                    boxShadow: '0 10px 25px rgba(107, 115, 255, 0.3)'
                  }}
                >
                  <span>🔙</span>
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;