import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useCart } from '../context/CartContext'; // Replace with your actual cart context
import { FaPlus, FaMinus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="relative rounded-xl p-6 bg-gradient-to-br from-[#FFF5EC] to-[#FFE8D6] text-center shadow-lg hover:shadow-xl transition-shadow duration-300 w-80 h-[480px] group flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-[#FF9149] tracking-tight truncate">{product.name.toUpperCase()}</h2>
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-56 w-full mx-auto object-cover rounded-lg mb-6 transform group-hover:scale-105 transition-transform duration-300 flex-grow-0"
      />
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          className="bg-[#FF9149] text-white p-2 rounded-full hover:bg-[#FF7A30] transition-colors duration-200"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <FaMinus className="w-4 h-4" />
        </button>
        <span className="text-xl font-semibold text-gray-800">{quantity}</span>
        <button
          className="bg-[#FF9149] text-white p-2 rounded-full hover:bg-[#FF7A30] transition-colors duration-200"
          onClick={() => setQuantity(quantity + 1)}
        >
          <FaPlus className="w-4 h-4" />
        </button>
      </div>
      <button
        className="bg-[#FF9149] text-white w-full py-3 rounded-xl font-semibold hover:bg-[#FF7A30] transition-colors duration-200"
        onClick={handleAddToCart}
      >
        ADD TO CART – ${product.price}
      </button>
      <button
        className="mt-3 text-[#FF9149] font-medium hover:text-[#FF7A30] transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        View More
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl text-left transform transition-all duration-300">
            <Dialog.Title className="text-2xl font-bold mb-4 text-gray-800">{product.name}</Dialog.Title>
            <div className="flex gap-3 overflow-x-auto mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className="w-28 h-28 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
            <p className="font-semibold mb-5 text-[#FF9149]">Category: {product.category}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <button
                  className="bg-[#FF6200] text-white p-2 rounded-full hover:bg-[#E55A00] transition-colors duration-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <span className="text-lg font-semibold text-gray-800">{quantity}</span>
                <button
                  className="bg-[#FF6200] text-white p-2 rounded-full hover:bg-[#E55A00] transition-colors duration-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <button
                className="bg-[#FF6200] text-white px-5 py-2 rounded-xl hover:bg-[#E55A00] transition-colors duration-200"
                onClick={() => {
                  handleAddToCart();
                  setIsOpen(false);
                }}
              >
                Add ${product.price} to Cart
              </button>
            </div>
            <button
              className="text-sm text-[#DC2626] mt-5 underline hover:text-[#B91C1C] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCard;