import React from 'react';

const PromotionCard = ({ promotion, onEdit, onDelete, showActions = false }) => {
  const currentDate = new Date('2025-06-20T16:21:00+05:30'); // Current date and time
  const isExpired = new Date(promotion.expires) < currentDate;
  const isActive = promotion.isActive && !isExpired;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header with status */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {promotion.offer}
          </h3>
          <div className="flex items-center space-x-2">
            {isActive ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                Active
              </span>
            ) : isExpired ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></span>
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
                Inactive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {promotion.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Discount</dt>
            <dd className="text-lg font-semibold text-indigo-600">{promotion.discount}%</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Min Order</dt>
            <dd className="text-sm font-medium text-gray-900">{promotion.minOrder} gallons</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Applies To</dt>
            <dd className="text-sm font-medium text-gray-900 capitalize">{promotion.appliesTo}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expires</dt>
            <dd className="text-sm font-medium text-gray-900">
              {new Date(promotion.expires).toLocaleDateString()}
            </dd>
          </div>
        </div>

        {/* Expiry warning for soon-to-expire promotions */}
        {isActive && new Date(promotion.expires) <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000) && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This promotion expires within 7 days
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions for admin interface */}
        {showActions && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => onEdit(promotion)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(promotion._id, promotion.offer)}
              className="text-sm font-medium text-red-600 hover:text-red-900 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Customer-facing call to action (when showActions is false) */}
      {!showActions && isActive && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Apply Promotion
          </button>
        </div>
      )}
    </div>
  );
};

export default PromotionCard;