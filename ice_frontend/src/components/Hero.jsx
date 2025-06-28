import React from 'react';

const Hero = ({ backgroundImage = '/hero-bg.jpg' }) => {
  return (
    <section
      id="home"
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: ` url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 text-[#FF9149] drop-shadow">
            Indulge in Creamy Bliss!
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-[#FFECDB] font-medium drop-shadow">
            Discover our delicious ice creams and cones for every occasion.
          </p>
          <a
            href="#products"
            className="inline-block bg-[#FF9149] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#60B5FF] hover:shadow-lg transition-all duration-300"
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
