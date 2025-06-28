import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import Hero from '../components/Hero';
import PromotionCard from '../components/PromotionCard';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import axios from 'axios';

const Home = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/promotions');
        const currentDate = new Date('2025-06-28T17:11:00+05:30'); // Current date and time
        let promotionsData = response.data;

        if (Array.isArray(promotionsData)) {
          promotionsData = promotionsData;
        } else if (promotionsData && Array.isArray(promotionsData.data)) {
          promotionsData = promotionsData.data;
        } else {
          console.error('Unexpected promotion format:', response.data);
          promotionsData = [];
        }

        const activePromotions = promotionsData.filter(
          (promo) => promo.isActive && new Date(promo.expires) >= currentDate
        );
        setPromotions(activePromotions);
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        let productsData = response.data;

        if (Array.isArray(productsData)) {
          productsData = productsData;
        } else if (productsData && Array.isArray(productsData.data)) {
          productsData = productsData.data;
        } else {
          console.error('Unexpected product format:', response.data);
          productsData = [];
        }

        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchPromotions();
    fetchProducts();
  }, []);

  const displayedProducts = showAllProducts ? products : products.slice(0, 4);

  return (
    <div className="font-poppins relative min-h-screen bg-gray-50">
      <UserNavbar setIsCartOpen={setIsCartOpen} />
      <Hero backgroundImage="/hero-bg.jpg" />
      
      <section id="promotions" className="py-20 bg-white relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#60B5FF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#FF9149] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#AFDDFF] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FF9149] mb-4 animate-fade-in tracking-tight">
              🍦 Sweet Deals
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Indulge in our exclusive ice cream promotions! Limited-time offers crafted to delight your taste buds.
            </p>
          </div>
          
          {promotions.length > 0 ? (
            <div className={`grid gap-8 ${promotions.length === 1 ? 'grid-cols-1 justify-items-center' : promotions.length === 2 ? 'grid-cols-2 justify-items-center' : 'grid-cols-1 md:grid-cols-3 auto-rows-max'}`}>
              {promotions.map((promotion) => (
                <div key={promotion._id} className="w-full transform hover:scale-[1.02] transition-transform duration-300 flex justify-center">
                  <PromotionCard promotion={promotion} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#AFDDFF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">🍦</span>
              </div>
              <p className="text-[#60B5FF] text-xl sm:text-2xl font-semibold">No Active Promotions</p>
              <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-md mx-auto">Stay tuned for exciting new deals coming soon!</p>
            </div>
          )}
        </div>
      </section>

      <section id="products" className="py-24 bg-white relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#60B5FF]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF9149]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#AFDDFF]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FF9149] mb-4 animate-fade-in tracking-tight">
              🍨 Our Premium Products
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Explore our handcrafted ice creams and premium cones, made with the finest ingredients and a passion for perfection.
            </p>
          </div>
          
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 justify-items-center">
                {displayedProducts.map((product) => (
                  <div key={product._id} className="w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {products.length > 4 && (
                <div className="text-center">
                  <button 
                    onClick={() => setShowAllProducts(!showAllProducts)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] hover:from-[#FF9149] hover:to-[#FF9149] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative flex items-center space-x-2">
                      <span>{showAllProducts ? 'Show Less Products' : 'View All Products'}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${showAllProducts ? 'rotate-180' : 'group-hover:translate-x-1'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        {showAllProducts ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        )}
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-[#AFDDFF] to-[#60B5FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-6xl">🍨</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#60B5FF] mb-4">Coming Soon!</h3>
              <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
                Our delicious ice cream collection is in the works. Stay tuned for something extraordinary!
              </p>
              <button className="bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:from-[#FF9149] hover:to-[#FF9149] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Notify Me When Available
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-24 bg-white relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-48 h-48 bg-[#60B5FF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20nell right-1/4 w-48 h-48 bg-[#FF9149] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FF9149] mb-4 animate-fade-in tracking-tight">
              About Us
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <p className="text-[#60B5FF] text-base sm:text-lg mb-6 leading-relaxed font-medium">
                  Welcome to IceCream Delight! Since 1990, we've been crafting premium ice creams and cones using locally sourced ingredients. Our mission is to bring joy to every bite with a variety of flavors for all.
                </p>
                <p className="text-[#60B5FF] text-base sm:text-lg leading-relaxed font-medium">
                  Our passionate team ensures quality in every creamy swirl and crispy cone. Join us in celebrating over three decades of deliciousness!
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div пленка className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-2">35+</div>
                  <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-[#60B5FF] mb-2">50+</div>
                  <div className="text-sm sm:text-base text-gray-600">Flavors</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-2">1000+</div>
                  <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#60B5FF]/20 to-[#FF9149]/20 rounded-2xl blur transform rotate-1"></div>
                <img
                  src="/team.png"
                  alt="IceCream Delight Team"
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Home;