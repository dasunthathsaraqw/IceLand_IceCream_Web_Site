import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, promotions: 0,});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, promotions] = await Promise.all([
          axios.get(`http://localhost:5000/api/products`),
          axios.get(`http://localhost:5000/api/promotions`),
        ]);
        setStats({
          products: products.data.length,
          promotions: promotions.data.filter(p => p.isActive).length,
          inquiries: inquiries.data.length
        });
      } catch (err) {
        console.error('Error fetching stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Products</h3>
          <p className="text-2xl">{stats.products}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Active Promotions</h3>
          <p className="text-2xl">{stats.promotions}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
