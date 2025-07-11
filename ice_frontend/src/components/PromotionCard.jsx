import React from 'react';
import 'animate.css';

const PromotionCard = ({ promotion }) => {
  const currentDate = new Date('2025-06-28T18:05:00+05:30'); // Updated to current time
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  // Mock promotion data if none provided
  const mockPromotion = {
    id: 1,
    offer: "Summer Special Deal",
    description: "Get amazing discounts on all premium items. Perfect for summer treats and special occasions.",
    discount: 0.25, // 25% discount
    appliesTo: "ALL PRODUCTS",
    minOrder: 1500,
    expires: "2025-08-15T23:59:59+05:30",
    isActive: true
  };

  const promotionData = promotion || mockPromotion;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDiscountText = () => {
    if (promotionData.discount > 0) {
      return promotionData.discount >= 1 ? `$${promotionData.discount} OFF` : `${Math.round(promotionData.discount * 100)}% OFF`;
    }
    return 'SPECIAL';
  };

  const getImageSrc = () => {
    const imageMap = {
      'ICE CREAM': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      'CONE ONLY': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      'ALL PRODUCTS': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    };
    return imageMap[promotionData.appliesTo.toUpperCase()] || 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop';
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border border-purple-200/40 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 w-full max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-1s ${!isActive ? 'opacity-70' : ''}`}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={getImageSrc()} 
          alt={promotionData.appliesTo} 
          className="w-full h-40 object-cover rounded-t-lg" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4 text-center flex flex-col gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          {promotionData.offer.toUpperCase()}
        </h3>
        <p className="text-xs sm:text-sm text-purple-800/80 line-clamp-2">{promotionData.description}</p>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full inline-block">
          <span className="text-sm font-bold text-white">{getDiscountText()}</span>
        </div>
        <p className="text-xs sm:text-sm text-purple-700/70">Min Order: LKR {promotionData.minOrder}</p>
        <p className="text-xs sm:text-sm text-purple-700/70">Expires: {formatDate(promotionData.expires)}</p>

        {/* Status Badge */}
        {!isActive && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            EXPIRED
          </div>
        )}
        
        {isActive && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ACTIVE
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionCard;