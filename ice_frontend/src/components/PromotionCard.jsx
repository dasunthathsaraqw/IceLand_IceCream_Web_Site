import React from 'react';

const PromotionCard = ({ promotion }) => {
  const currentDate = new Date('2025-06-25T21:06:00+05:30');
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  // Enhanced color schemes with more vibrant combinations
  const colorSchemes = [
    { 
      bg: 'linear-gradient(135deg, #60B5FF 0%, #AFDDFF 50%, #FF9149 100%)', 
      textColor: 'text-white',
      accentBg: 'bg-white/30',
      badgeBg: 'bg-gradient-to-r from-red-500 to-pink-500',
      shadow: 'shadow-blue-500/30'
    },
    { 
      bg: 'linear-gradient(135deg, #FF9149 0%, #FFECDB 50%, #60B5FF 100%)', 
      textColor: 'text-gray-800',
      accentBg: 'bg-white/40',
      badgeBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      shadow: 'shadow-orange-500/30'
    },
    { 
      bg: 'linear-gradient(135deg, #AFDDFF 0%, #FF9149 50%, #60B5FF 100%)', 
      textColor: 'text-white',
      accentBg: 'bg-white/25',
      badgeBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
      shadow: 'shadow-cyan-500/30'
    },
    { 
      bg: 'linear-gradient(135deg, #FFECDB 0%, #60B5FF 50%, #FF9149 100%)', 
      textColor: 'text-gray-800',
      accentBg: 'bg-gray-800/10',
      badgeBg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/30'
    }
  ];

  const colorScheme = colorSchemes[Math.abs(promotion.offer.length) % colorSchemes.length];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDiscountText = () => {
    if (promotion.discount > 0) {
      return promotion.discount >= 1 
        ? `$${promotion.discount} OFF` 
        : `${Math.round(promotion.discount * 100)}% OFF`;
    }
    return 'SPECIAL';
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl shadow-2xl ${colorScheme.shadow} ${!isActive ? 'opacity-60' : ''} transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-rotate-1 cursor-pointer group animate-pulse-slow w-full max-w-sm mx-auto`}
      style={{ 
        background: colorScheme.bg,
        minHeight: '400px',
        height: 'auto'
      }}
    >
      {/* Animated sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-bounce opacity-80"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full animate-ping opacity-50 animation-delay-500"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-3 right-3 opacity-20">
        <div className="grid grid-cols-4 gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`w-1 h-1 ${colorScheme.textColor === 'text-white' ? 'bg-white' : 'bg-gray-800'} rounded-full animate-pulse`} style={{animationDelay: `${i * 0.2}s`}}></div>
          ))}
        </div>
      </div>

      {/* Dynamic wave decoration */}
      <div className="absolute bottom-0 right-0 w-full h-12 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
        <svg viewBox="0 0 400 50" className={`w-full h-full ${colorScheme.textColor === 'text-white' ? 'fill-white' : 'fill-gray-800'}`}>
          <path d="M400,50 Q300,10 200,25 T0,20 L0,50 Z" />
        </svg>
      </div>

      {/* Main content - flexible height */}
      <div className="relative p-4 min-h-[400px] flex flex-col justify-between">
        {/* Header section */}
        <div className="flex justify-between items-start mb-4">
          <div className={`${colorScheme.accentBg} backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20`}>
            <span className={`text-xs font-bold uppercase tracking-wide ${colorScheme.textColor} flex items-center`}>
              ⚡ HOT DEAL
            </span>
          </div>
          
          {/* Enhanced discount badge */}
          <div className={`${colorScheme.badgeBg} text-white px-3 py-2 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300 group-hover:scale-110 animate-bounce-subtle border-2 border-white/30`}>
            <span className="text-sm font-black tracking-tight">
              {getDiscountText()}
            </span>
          </div>
        </div>

        {/* Main offer text - increased space */}
        <div className="mb-6 text-center">
          <h2 className={`text-xl md:text-2xl font-black ${colorScheme.textColor} leading-tight mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-300`}>
            {promotion.offer.toUpperCase()}
          </h2>
          <p className={`${colorScheme.textColor} text-opacity-90 text-sm leading-relaxed line-clamp-2`}>
            {promotion.description}
          </p>
        </div>

        {/* Details section - more spaced out */}
        <div className="space-y-4">
          {/* Promotion details - stacked vertically */}
          <div className="space-y-2">
            {promotion.minOrder > 0 && (
              <div className={`${colorScheme.accentBg} backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 text-center`}>
                <span className={`${colorScheme.textColor} text-opacity-80 font-medium text-sm`}>
                  💰 Minimum Order: ${promotion.minOrder}
                </span>
              </div>
            )}
            
            <div className={`${colorScheme.accentBg} backdrop-blur-sm px-3 py-2 rounded-full border border-white/10 text-center`}>
              <span className={`${colorScheme.textColor} text-opacity-80 font-medium text-sm`}>
                🎯 Applies to: {promotion.appliesTo}
              </span>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col items-center space-y-3">
            <div className={`text-sm ${colorScheme.textColor} text-opacity-70 text-center`}>
              {isExpired ? (
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                  ❌ EXPIRED
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  ⏰ Valid until {formatDate(promotion.expires)}
                </span>
              )}
            </div>
            
            {isActive && (
              <div className={`${colorScheme.accentBg} backdrop-blur-sm px-4 py-2.5 rounded-full hover:bg-white/50 transition-all group border border-white/20 transform hover:scale-105 w-full text-center`}>
                <span className={`text-sm font-bold ${colorScheme.textColor} group-hover:scale-105 inline-block transition-transform flex items-center justify-center`}>
                  🛒 ORDER NOW
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced status overlay */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full text-base font-black border-2 border-white/20 animate-pulse">
              {isExpired ? '💀 EXPIRED' : '⏸️ INACTIVE'}
            </div>
          </div>
        )}

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default PromotionCard;