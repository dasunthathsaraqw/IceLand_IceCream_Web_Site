import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../component/ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Ice Cream',
    promotionId: ''
  });
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, promotionsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/products`),
          axios.get(`${process.env.REACT_APP_API_URL}/promotions`)
        ]);
        setProducts(productsRes.data);
        setPromotions(promotionsRes.data);
      } catch (err) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, promotionId: formData.promotionId || null };
      if (formData.id) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/products/${formData.id}`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/products`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      setFormData({ id: '', name: '', price: '', description: '', image: '', category: 'Ice Cream', promotionId: '' });
      const productsRes = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(productsRes.data);
    } catch (err) {
      console.error('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      promotionId: product.promotionId?._id || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        promotions={promotions}
      />
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Product List</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Promotion</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td className="p-2">{product.name}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.promotionId?.offer || 'None'}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
