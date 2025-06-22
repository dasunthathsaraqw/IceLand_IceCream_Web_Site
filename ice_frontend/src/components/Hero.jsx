import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(/hero-bg.jpg)` }}>
      {/* Animated background blur effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-40 blur-xl animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-25 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-35 blur-xl animate-bounce" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
      </div>

      {/* Main overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-700/40 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          {/* Sparkling stars decoration */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2 animate-pulse">
              <span className="text-yellow-300 text-2xl">✨</span>
              <span className="text-orange-300 text-xl">⭐</span>
              <span className="text-yellow-400 text-2xl">✨</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
            Indulge in Creamy Bliss! 🍦
          </h1>
          
          <p className="text-xl md:text-3xl mb-8 text-blue-100 drop-shadow-lg font-medium leading-relaxed">
            Discover our delicious ice creams and cones for every occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#products" 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-4 px-8 rounded-full hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl text-lg transform hover:-translate-y-1"
            >
              🍨 Explore Products
            </a>
            
            <a 
              href="#promotions" 
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 px-8 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-2xl text-lg border-2 border-blue-300/50 transform hover:-translate-y-1"
            >
              🎉 Special Offers
            </a>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 hidden md:block">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 animate-bounce" style={{animationDuration: '3s'}}>
              <span className="text-4xl">🍦</span>
            </div>
          </div>
          
          <div className="absolute bottom-20 right-10 hidden md:block">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
              <span className="text-4xl">🍨</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-blue-200">
              <span className="text-sm mb-2 font-medium">Scroll Down</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-orange-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Hero;