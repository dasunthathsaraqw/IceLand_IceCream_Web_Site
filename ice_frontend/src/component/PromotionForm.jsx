function PromotionForm({ formData, setFormData, handleSubmit }) {
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Offer</label>
          <input
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Min Order (Gallons)</label>
          <input
            type="number"
            name="minOrder"
            value={formData.minOrder}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Expires</label>
          <input
            type="date"
            name="expires"
            value={formData.expires}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apply To</label>
          <select
            name="appliesTo"
            value={formData.appliesTo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="all">All Products</option>
            <option value="category: Ice Cream">Ice Cream</option>
            <option value="category: Cone">Cone</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="p-2"
          />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        {formData.id ? 'Update Promotion' : 'Add Promotion'}
      </button>
    </form>
  );
}

export default PromotionForm;