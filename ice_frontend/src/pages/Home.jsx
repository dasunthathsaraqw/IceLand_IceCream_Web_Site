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
        const currentDate = new Date('2025-06-20T18:12:00+05:30'); // Updated to current time
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
    <div>
      <UserNavbar />
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/ice-cream-hero.jpg')" }}>
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
      <section id="promotions" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Special Promotions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion._id} promotion={promotion} />
            ))}
          </div>
        </div>
      </section>
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="py-12 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                Welcome to IceCream Delight! Founded in 1990, we’ve been crafting the finest ice creams and cones with
                locally sourced ingredients. Our mission is to bring joy to every bite, offering a variety of flavors for
                individuals and bulk orders alike.
              </p>
              <p className="text-gray-700">
                Our team is passionate about quality, from the creamy swirls of our ice cream to the crisp perfection of
                our cones. Join us in celebrating over three decades of deliciousness!
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/team.jpg"
                alt="IceCream Delight Team"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
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