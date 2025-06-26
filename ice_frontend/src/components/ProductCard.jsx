import React, { useState } from 'react';

// Mock cart context for demo purposes
const useCart = () => ({
  addToCart: (product, quantity) => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
  }
});

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Simplified color schemes matching PromotionCard style
  const categoryColors = {
    'Ice Cream': {
      bg: 'linear-gradient(135deg, #60B5FF 0%, #AFDDFF 50%, #FF9149 100%)',
      textColor: 'text-white',
      accentBg: 'bg-white/30',
      badgeBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/30'
    },
    'Bulk Orders': {
      bg: 'linear-gradient(135deg, #FF9149 0%, #FFECDB 50%, #60B5FF 100%)',
      textColor: 'text-gray-800',
      accentBg: 'bg-white/40',
      badgeBg: 'bg-gradient-to-r from-orange-500 to-red-500',
      shadow: 'shadow-orange-500/30'
    },
    'Desserts': {
      bg: 'linear-gradient(135deg, #AFDDFF 0%, #FF9149 50%, #60B5FF 100%)',
      textColor: 'text-white',
      accentBg: 'bg-white/25',
      badgeBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
      shadow: 'shadow-purple-500/30'
    },
    'Beverages': {
      bg: 'linear-gradient(135deg, #FFECDB 0%, #60B5FF 50%, #FF9149 100%)',
      textColor: 'text-gray-800',
      accentBg: 'bg-gray-800/10',
      badgeBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      shadow: 'shadow-green-500/30'
    },
    'default': {
      bg: 'linear-gradient(135deg, #60B5FF 0%, #AFDDFF 50%, #FF9149 100%)',
      textColor: 'text-white',
      accentBg: 'bg-white/30',
      badgeBg: 'bg-gradient-to-r from-blue-500 to-purple-500',
      shadow: 'shadow-blue-500/30'
    }
  };

  const colorScheme = categoryColors[product?.category] || categoryColors['default'];

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Simple notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-xl z-50 text-sm font-medium animate-bounce">
        ✅ Added to cart!
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
  };

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const getCurrentImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[currentImageIndex];
    }
    return product.image || 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400';
  };

  // Demo product if none provided
  const demoProduct = {
    name: "Premium Vanilla Dream",
    price: 12.99,
    category: "Ice Cream",
    description: "Luxurious vanilla ice cream made with Madagascar vanilla beans and fresh cream.",
    images: [
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400"
    ]
  };

  const displayProduct = product || demoProduct;

  return (
    <>
      <div 
        className={`relative overflow-hidden rounded-2xl shadow-2xl ${colorScheme.shadow} transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-rotate-1 cursor-pointer group w-full max-w-sm mx-auto`}
        style={{ 
          background: colorScheme.bg,
          minHeight: '350px'
        }}
      >
        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-70"></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full animate-bounce opacity-80"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
        </div>

        {/* Main content */}
        <div className="relative p-4 min-h-[350px] flex flex-col justify-between">
          {/* Header section */}
          <div className="flex justify-between items-start mb-3">
            <div className={`${colorScheme.accentBg} backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20`}>
              <span className={`text-xs font-bold uppercase tracking-wide ${colorScheme.textColor}`}>
                {displayProduct.category}
              </span>
            </div>
            
            <div className={`${colorScheme.badgeBg} text-white px-2.5 py-1.5 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300 group-hover:scale-110 border border-white/30`}>
              <span className="text-xs font-black">
                ${displayProduct.price}
              </span>
            </div>
          </div>

          {/* Product image section */}
          <div className="relative h-32 mb-3 rounded-xl overflow-hidden">
            <img 
              src={getCurrentImage()} 
              alt={displayProduct.name} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Image navigation for multiple images */}
            {displayProduct.images && displayProduct.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {displayProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white shadow-md scale-125' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product name */}
          <div className="mb-3 text-center">
            <h3 className={`text-base font-black ${colorScheme.textColor} leading-tight mb-1 drop-shadow-sm group-hover:scale-105 transition-transform duration-300`}>
              {displayProduct.name.toUpperCase()}
            </h3>
            <p className={`${colorScheme.textColor} text-opacity-80 text-xs leading-relaxed line-clamp-2`}>
              {displayProduct.description}
            </p>
          </div>

          {/* Quantity selector for bulk orders */}
          {displayProduct.category === 'Bulk Orders' && (
            <div className={`${colorScheme.accentBg} backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 mb-3`}>
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-6 h-6 rounded-full ${colorScheme.badgeBg} text-white flex items-center justify-center hover:scale-110 transition-all duration-300 text-xs font-bold`}
                >
                  −
                </button>
                <span className={`${colorScheme.textColor} text-xs font-bold px-2`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`w-6 h-6 rounded-full ${colorScheme.badgeBg} text-white flex items-center justify-center hover:scale-110 transition-all duration-300 text-xs font-bold`}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 ${colorScheme.accentBg} backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/50 transition-all group border border-white/20 transform hover:scale-105`}
            >
              <span className={`text-xs font-bold ${colorScheme.textColor} group-hover:scale-105 inline-block transition-transform flex items-center justify-center`}>
                🛒 ADD TO CART
              </span>
            </button>
            
            <button
              onClick={() => setShowDetails(true)}
              className={`${colorScheme.accentBg} backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white/50 transition-all group border border-white/20 transform hover:scale-105`}
            >
              <span className={`text-xs font-bold ${colorScheme.textColor} group-hover:scale-105 inline-block transition-transform`}>
                👁️
              </span>
            </button>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>

        {/* Bottom shine effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Modal for detailed view - simplified */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-red-500 hover:text-white p-2 rounded-full shadow-xl transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-3xl">
                <img 
                  src={getCurrentImage()} 
                  alt={displayProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2">{displayProduct.name}</h2>
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {displayProduct.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                      <span className="text-xl font-black">${displayProduct.price}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{displayProduct.description}</p>
                </div>

                {/* Quantity and Add to Cart in Modal */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  {displayProduct.category === 'Bulk Orders' && (
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-700 font-bold text-sm">Qty:</span>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg font-bold text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setShowDetails(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4-2L3 3m4 10v6a1 1 0 001 1h12a1 1 0 001-1v-6M8 13v6m8-6v6" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;