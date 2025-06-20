import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Number(e.target.value)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`); // Temporary feedback
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <h3 className="text-xl font-semibold text-pink-600 mt-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-800 font-medium">Price: ${product.price}</p>
      {product.category === 'Bulk Orders' && (
        <div className="mt-2">
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full p-2 border rounded"
            min="1"
          />
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;