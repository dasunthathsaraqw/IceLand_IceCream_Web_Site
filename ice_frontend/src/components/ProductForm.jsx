import { useState } from 'react';

function ProductForm({ formData, setFormData, handleSubmit, promotions, onCancel, isEditing }) {
  const [imagePreviews, setImagePreviews] = useState(formData.images || []);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Each file must be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setError('');
    const newFiles = [...(formData.images || []), ...validFiles].slice(0, 5);
    setFormData({ ...formData, images: newFiles });

    const previews = newFiles.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : file
    );
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('promotionId', formData.promotionId || '');

      formData.images?.forEach((image, index) => {
        if (image instanceof File) {
          formDataToSend.append('images', image);
        } else {
          formDataToSend.append(`existingImages[${index}]`, image);
        }
      });

      await handleSubmit(formDataToSend);
      setImagePreviews([]);
    } catch (err) {
      setError('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {isEditing ? 'Update the product information below' : 'Fill in the details to add a new product'}
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="p-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (LKR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option value="Ice Cream">Ice Cream</option>
              <option value="Cone">Cone</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="promotionId" className="block text-sm font-medium text-gray-700">
              Promotion
            </label>
            <select
              id="promotionId"
              name="promotionId"
              value={formData.promotionId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option value="">No promotion</option>
              {promotions.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.offer}
                </option>
              ))}
            </select>
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
              placeholder="Enter product description"
              required
            />
            <p className="text-xs text-gray-500">Provide a detailed description of the product</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Product Images (up to 5) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required={!isEditing && !formData.images?.length}
            />
            <p className="text-xs text-gray-500">Upload up to 5 image files (PNG, JPG, etc.)</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        {imagePreviews.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Previews</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Product preview ${index + 1}`}
                    className="h-20 md:h-40 w-full object-contain border border-gray-200 rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Images will be displayed at 40x40px in the product list
            </p>
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
            {isLoading ? 'Uploading...' : isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;