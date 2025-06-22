import React from 'react';

const PromotionCard = ({ promotion }) => {
  const currentDate = new Date('2025-06-20T16:21:00+05:30'); // Current date and time
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-200/50 backdrop-blur-sm overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-60 blur-sm"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-50 blur-sm"></div>
      
      {isActive ? (
        <>
          {/* Active promotion badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-bl-lg rounded-tr-2xl text-xs font-bold shadow-md">
            🔥 ACTIVE
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3 leading-tight">
              🎉 {promotion.offer}
            </h3>
            
            <p className="text-blue-700 mb-4 text-base leading-relaxed font-medium">
              {promotion.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 font-bold text-lg">💰</span>
                <p className="text-blue-800 font-bold text-lg">
                  Discount: <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent font-extrabold">{promotion.discount}%</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">🛒</span>
                <p className="text-blue-700 font-semibold">Min Order: {promotion.minOrder}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-green-500 font-bold">✅</span>
                <p className="text-blue-600 text-sm">Applies to: {promotion.appliesTo}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-bold">⏰</span>
                <p className="text-blue-500 text-sm">Expires: {new Date(promotion.expires).toLocaleDateString()}</p>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-3 px-6 rounded-xl hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-lg font-bold text-lg transform hover:-translate-y-1 flex items-center justify-center space-x-2">
              <span>🍦</span>
              <span>Add to Cart</span>
            </button>
          </div>
        </>
      ) : (
        <div className="relative z-10 text-center py-8">
          {/* Expired promotion styling */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-2xl text-xs font-bold shadow-md">
            ❌ EXPIRED
          </div>
          
          <div className="mb-4">
            <span className="text-6xl opacity-50">😞</span>
          </div>
          
          <p className="text-blue-400 italic text-lg font-medium bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            This promotion is no longer active.
          </p>
          
          <div className="mt-4 p-3 bg-blue-100/50 rounded-lg border border-blue-200/30">
            <p className="text-blue-600 text-sm">
              Stay tuned for more amazing offers! 🎉
            </p>
          </div>
        </div>
      )}
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-200/30 to-transparent rounded-br-2xl"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-orange-200/30 to-transparent rounded-tl-2xl"></div>
    </div>
  );
};

export default PromotionCard;