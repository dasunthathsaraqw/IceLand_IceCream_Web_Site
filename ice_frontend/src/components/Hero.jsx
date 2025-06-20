import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Indulge in Creamy Bliss!</h1>
          <p className="text-xl md:text-2xl mb-6">Discover our delicious ice creams and cones for every occasion.</p>
          <a href="#products" className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-pink-600 transition">
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;