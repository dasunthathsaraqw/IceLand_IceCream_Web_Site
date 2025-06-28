import React from 'react';
import 'animate.css';

const PromotionCard = ({ promotion }) => {
  const currentDate = new Date('2025-06-28T18:05:00+05:30'); // Updated to current time
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDiscountText = () => {
    if (promotion.discount > 0) {
      return promotion.discount >= 1 ? `$${promotion.discount} OFF` : `${Math.round(promotion.discount * 100)}% OFF`;
    }
    return 'SPECIAL';
  };

  const getImageSrc = () => {
    const imageMap = {
      'ICE CREAM': '/ice-cream.jpg',
      'CONE ONLY': '/cones.jpg',
      'ALL PRODUCTS': '/all-products.jpg',
    };
    return imageMap[promotion.appliesTo.toUpperCase()] || '/default-promotion.jpg';
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-[#FFECDB] border border-[#FF9149]/20 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 w-full max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-1s ${!isActive ? 'opacity-70' : ''}`}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={getImageSrc()} 
          alt={promotion.appliesTo} 
          className="w-full h-40 object-cover rounded-t-lg" 
        />
        <div className="absolute inset-0 bg-[#FF9149]/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4 text-center flex flex-col gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-[#FF9149]">{promotion.offer.toUpperCase()}</h3>
        <p className="text-xs sm:text-sm text-[#4A2C0D] line-clamp-2">{promotion.description}</p>
        <div className="bg-[#FF9149] px-3 py-1 rounded-full inline-block">
          <span className="text-sm font-bold text-[#FFFFFF]">{getDiscountText()}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#4A2C0D]/80">Min Order: LKR {promotion.minOrder}</p>
        <p className="text-xs sm:text-sm text-[#4A2C0D]/80">Expires: {formatDate(promotion.expires)}</p>

        {/* Button or Expired Badge */}
        
        
      </div>
    </div>
  );
};

export default PromotionCard;