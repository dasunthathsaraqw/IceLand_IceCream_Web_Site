import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import Hero from '../components/Hero';
import PromotionCard from '../components/PromotionCard';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import Footer from '../components/Footer';
import axios from 'axios';

const Home = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/promotions');
        const currentDate = new Date('2025-06-25T21:19:00+05:30');
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

  // Get products to display based on showAllProducts state - now showing 4 products initially (2 rows of 2)
  const displayedProducts = showAllProducts ? products : products.slice(0, 4);

  return (
    <div className="font-poppins">
      <UserNavbar />
      <Hero backgroundImage="/hero-bg.jpg" />
      
      {/* Promotions Section */}
      <section id="promotions" className="py-16 bg-gradient-to-br from-[#FFECDB] via-[#FFECDB] to-[#AFDDFF]/30 relative overflow-hidden min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#60B5FF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#FF9149] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#AFDDFF] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-4 animate-fade-in">
              🍦 SWEET DEALS    
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
              Don't miss out on these amazing ice cream promotions! Limited time offers that will make your taste buds dance with joy.
            </p>
          </div>
          
          {promotions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-max">
              {promotions.map((promotion) => (
                <div key={promotion._id} className="w-full transform hover:scale-[1.02] transition-transform duration-300 flex justify-center">
                  <PromotionCard promotion={promotion} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#AFDDFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🍦</span>
              </div>
              <p className="text-[#60B5FF] text-xl font-medium">No active promotions available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for exciting new deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* Products Section - Updated to show 2 products per row */}
      <section id="products" className="py-20 bg-gradient-to-br from-[#FFECDB] via-white to-[#AFDDFF]/20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#60B5FF]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF9149]/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#AFDDFF]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-4 animate-fade-in">
              🍨 Our Premium Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
              Discover our handcrafted ice creams and premium cones, made with the finest ingredients and lots of love.
            </p>
          </div>
          
          {products.length > 0 ? (
            <>
              {/* Products Grid - 2 products per row with larger spacing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 justify-items-center">
                {displayedProducts.map((product) => (
                  <div key={product._id} className="w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Toggle View Button - Only show if there are more than 4 products */}
              {products.length > 4 && (
                <div className="text-center">
                  <button 
                    onClick={() => setShowAllProducts(!showAllProducts)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] hover:from-[#FF9149] hover:to-[#FF9149] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
                <span className="text-5xl">🍨</span>
              </div>
              <h3 className="text-2xl font-bold text-[#60B5FF] mb-4">Coming Soon!</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
                We're working hard to bring you the most delicious ice cream products. 
                Stay tuned for our amazing collection!
              </p>
              <button className="bg-gradient-to-r from-[#60B5FF] to-[#AFDDFF] text-white px-6 py-3 rounded-full font-medium hover:from-[#FF9149] hover:to-[#FF9149] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Notify Me When Available
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-[#FFECDB] via-[#FFECDB] to-[#AFDDFF]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-48 h-48 bg-[#60B5FF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#FF9149] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FF9149] mb-4 animate-fade-in">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#60B5FF] to-[#FF9149] mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                <p className="text-[#60B5FF] text-sm mb-6 leading-relaxed">
                  Welcome to IceCream Delight! Founded in 1990, we've been crafting the finest ice creams and cones with
                  locally sourced ingredients. Our mission is to bring joy to every bite, offering a variety of flavors for
                  individuals and bulk orders alike.
                </p>
                <p className="text-[#60B5FF] text-sm leading-relaxed">
                  Our team is passionate about quality, from the creamy swirls of our ice cream to the crisp perfection of
                  our cones. Join us in celebrating over three decades of deliciousness!
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div className="text-2xl font-bold text-[#FF9149] mb-1">35+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div className="text-2xl font-bold text-[#60B5FF] mb-1">50+</div>
                  <div className="text-sm text-gray-600">Flavors</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-lg border border-white/20">
                  <div className="text-2xl font-bold text-[#FF9149] mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
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
    </div>
  );
};

export default Home;