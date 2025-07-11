import { useState } from 'react';

function PromotionForm({ formData, setFormData, handleSubmit, onCancel, isEditing }) {
  const [imagePreview, setImagePreview] = useState(formData.image || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be less than 10MB');
      return;
    }

    setError('');
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
    setImagePreview('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('offer', formData.offer);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('minOrder', formData.minOrder);
      formDataToSend.append('expires', formData.expires);
      formDataToSend.append('appliesTo', formData.appliesTo);
      formDataToSend.append('isActive', formData.isActive);
      
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      } else if (formData.image) {
        formDataToSend.append('existingImage', formData.image);
      }

      await handleSubmit(formDataToSend);
      setImagePreview('');
    } catch (err) {
      setError('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const isExpiringSoon = formData.expires &&
    new Date(formData.expires) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
    new Date(formData.expires) >= new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Edit Promotion' : 'Create New Promotion'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {isEditing ? 'Update the promotion details below' : 'Set up a new promotional offer for your customers'}
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="p-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="offer" className="block text-sm font-medium text-gray-700">
              Offer Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="offer"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="e.g., Summer Special 20% Off"
              required
            />
            <p className="text-xs text-gray-500">This will be displayed as the main promotion title</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount Percentage <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="20"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
              placeholder="Describe the promotion details and terms..."
              required
            />
            <p className="text-xs text-gray-500">Provide clear details about the promotion</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="minOrder" className="block text-sm font-medium text-gray-700">
              Minimum Order (LKR) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="minOrder"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="1000"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">LKR</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="expires" className="block text-sm font-medium text-gray-700">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="expires"
              name="expires"
              value={formData.expires}
              onChange={handleChange}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
            {isExpiringSoon && (
              <p className="text-xs text-yellow-600 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                This promotion expires within 7 days
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="appliesTo" className="block text-sm font-medium text-gray-700">
              Applies To <span className="text-red-500">*</span>
            </label>
            <select
              id="appliesTo"
              name="appliesTo"
              value={formData.appliesTo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            >
              <option value="">Select category</option>
              <option value="all">All Products</option>
              <option value="category: Ice Cream">Ice Cream Only</option>
              <option value="category: Cone">Cone Only</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="flex items-center space-x-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <div className="text-xs text-gray-500">
                {formData.isActive ? (
                  <span className="text-green-600">✓ Promotion is active</span>
                ) : (
                  <span className="text-gray-400">○ Promotion is inactive</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">Only active promotions will be visible to customers</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Promotion Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required={!isEditing && !formData.image}
            />
            <p className="text-xs text-gray-500">Upload one image file (PNG, JPG, etc.)</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {imagePreview && (
            <div className="mt-6 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
              <div className="relative w-40">
                <img
                  src={imagePreview}
                  alt="Promotion preview"
                  className="h-40 w-40 object-contain border border-gray-200 rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
                >
                  X
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Image will be displayed at 40x40px in the promotion list
              </p>
            </div>
          )}
        </div>

        {formData.offer && formData.discount && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <div className="text-sm text-gray-600">
              <p><strong>{formData.offer}</strong></p>
              <p>{formData.discount}% off • Min order: LKR {formData.minOrder || '0'}</p>
              {formData.description && <p className="text-xs mt-1">{formData.description}</p>}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-end space-x-4">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Uploading...' : isEditing ? 'Update Promotion' : 'Create Promotion'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromotionForm;