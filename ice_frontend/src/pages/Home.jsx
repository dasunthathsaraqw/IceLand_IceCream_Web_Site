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

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/promotions');
        const currentDate = new Date('2025-06-20T18:12:00+05:30');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50">
      <UserNavbar />
      <Hero />
      
      {/* Special Promotions Section */}
      <section id="promotions" className="py-16 bg-gradient-to-r from-blue-100/50 via-orange-100/30 to-yellow-100/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              ✨ Special Promotions
            </h2>
            <p className="text-xl text-blue-700/80 font-medium">Don't miss our amazing deals!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promotion) => (
              <div key={promotion._id} className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <PromotionCard promotion={promotion} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gradient-to-l from-yellow-100/40 via-orange-100/30 to-blue-100/40 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent mb-4">
              🍦 Our Products
            </h2>
            <p className="text-xl text-orange-700/80 font-medium">Crafted with love, served with joy</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-blue-200/30 via-orange-200/20 to-yellow-200/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-10 left-1/2 w-44 h-44 bg-gradient-to-r from-blue-300/10 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-blue-600 bg-clip-text text-transparent mb-4">
              🌟 About Us
            </h2>
            <p className="text-xl text-blue-700/80 font-medium">Our sweet journey since 1990</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Welcome to <span className="font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">IceCream Delight!</span> Founded in 1990, we've been crafting the finest ice creams and cones with
                  locally sourced ingredients. Our mission is to bring joy to every bite, offering a variety of flavors for
                  individuals and bulk orders alike.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our team is passionate about quality, from the creamy swirls of our ice cream to the crisp perfection of
                  our cones. Join us in celebrating over three decades of deliciousness!
                </p>
                
                {/* Decorative elements */}
                <div className="flex justify-center mt-8 space-x-4">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-3 animate-bounce" style={{animationDuration: '3s'}}>
                    <span className="text-2xl">🍦</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full p-3 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
                    <span className="text-2xl">🍨</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-3 animate-bounce" style={{animationDelay: '2s', animationDuration: '3s'}}>
                    <span className="text-2xl">🧁</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <img
                  src="/images/team.jpg"
                  alt="IceCream Delight Team"
                  className="relative w-full h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Inquiry Form and Footer sections */}
      <div className="bg-gradient-to-t from-blue-100/30 via-orange-100/20 to-yellow-100/30">
        <InquiryForm />
        <Footer />
      </div>
    </div>
  );
};

export default Home;