import React from 'react';

const Hero = ({ backgroundImage = '/hero-bg.jpg' }) => {
  return (
    <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: '#FFECDB' }}>
      <div className="absolute inset-0  flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#FF9149' }}>Indulge in Creamy Bliss!</h1>
          <p className="text-xl md:text-2xl mb-6" style={{ color: '#AFDDFF' }}>Discover our delicious ice creams and cones for every occasion.</p>
          <a href="#products" className="bg-[#FF9149] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#60B5FF] transition">
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;