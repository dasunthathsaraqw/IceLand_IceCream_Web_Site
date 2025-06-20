function ProductForm({ formData, setFormData, handleSubmit, promotions }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
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
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Ice Cream</option>
            <option>Cone</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Promotion</label>
          <select
            name="promotionId"
            value={formData.promotionId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">None</option>
            {promotions.map(p => (
              <option key={p._id} value={p._id}>{p.offer}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        {formData.id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
