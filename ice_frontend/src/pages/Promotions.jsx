import { useEffect, useState } from 'react';
import axios from 'axios';
import PromotionForm from '../components/PromotionForm';

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    offer: '',
    description: '',
    discount: '',
    minOrder: '',
    expires: '',
    appliesTo: 'all',
    isActive: true
  });

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/promotions`);
        setPromotions(res.data);
      } catch (err) {
        console.error('Error fetching promotions');
      }
    };
    fetchPromotions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, expires: new Date(formData.expires) };
      if (formData.id) {
        await axios.put(
          `http://localhost:5000/api/promotions/${formData.id}`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/promotions`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      setFormData({
        id: '',
        offer: '',
        description: '',
        discount: '',
        minOrder: '',
        expires: '',
        appliesTo: 'all',
        isActive: true
      });
      const res = await axios.get(`http://localhost:5000/api/promotions`);
      setPromotions(res.data);
    } catch (err) {
      console.error('Error saving promotion');
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      id: promotion._id,
      offer: promotion.offer,
      description: promotion.description,
      discount: promotion.discount,
      minOrder: promotion.minOrder,
      expires: promotion.expires.split('T')[0],
      appliesTo: promotion.appliesTo,
      isActive: promotion.isActive
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/promotions/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPromotions(promotions.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting promotion');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Promotions</h2>
      <PromotionForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Promotion List</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Offer</th>
              <th className="p-2">Discount (%)</th>
              <th className="p-2">Applies To</th>
              <th className="p-2">Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(promo => (
              <tr key={promo._id}>
                <td className="p-2">{promo.offer}</td>
                <td className="p-2">{promo.discount}%</td>
                <td className="p-2">{promo.appliesTo}</td>
                <td className="p-2">{promo.isActive ? 'Yes' : 'No'}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(promo._id)}
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

export default Promotions;