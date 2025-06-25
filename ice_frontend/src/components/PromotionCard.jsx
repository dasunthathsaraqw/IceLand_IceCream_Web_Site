import React from 'react';

const PromotionCard = ({ promotion }) => {
  const currentDate = new Date('2025-06-20T16:21:00+05:30'); // Current date and time
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      {isActive ? (
        <>
          <h3 className="text-xl font-semibold text-pink-600">{promotion.offer}</h3>
          <p className="text-gray-600 mb-2">{promotion.description}</p>
          <p className="text-gray-800 font-medium">Discount: {promotion.discount}%</p>
          <p className="text-gray-800">Min Order: {promotion.minOrder}</p>
          <p className="text-gray-600 text-sm">Applies to: {promotion.appliesTo}</p>
          <p className="text-gray-500 text-xs">Expires: {new Date(promotion.expires).toLocaleDateString()}</p>
          <button className="mt-2 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition">
            Add to Cart
          </button>
        </>
      ) : (
        <p className="text-gray-500 italic">This promotion is no longer active.</p>
      )}
    </div>
  );
};

export default PromotionCard;