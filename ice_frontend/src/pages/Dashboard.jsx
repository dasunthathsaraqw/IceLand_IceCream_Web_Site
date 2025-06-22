import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, promotions: 0, inquiries: 0 });
  const [reportData, setReportData] = useState({ type: '', data: [] });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [products, promotions, inquiries] = await Promise.all([
          axios.get(`http://localhost:5000/api/products`),
          axios.get(`http://localhost:5000/api/promotions`),
          axios.get(`http://localhost:5000/api/inquiries`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats({
          products: products.data.length,
          promotions: promotions.data.filter((p) => p.isActive).length,
          inquiries: inquiries.data.length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStatus('Failed to fetch stats.');
      }
    };
    fetchStats();
  }, []);

  const fetchReport = async (type) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/reports/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReportData({ type, data: res.data });
      setStatus(`Loaded ${type} report.`);
    } catch (err) {
      setStatus(`Failed to load ${type} report.`);
      console.error(`Error fetching ${type} report:`, err);
    }
  };

  const downloadPDF = () => {
    const { type, data } = reportData;
    if (!type || data.length === 0) {
      setStatus('No report data to download.');
      return;
    }

    const doc = new jsPDF();
    const currentDate = new Date('2025-06-23T00:17:00+05:30').toLocaleDateString();

    // Set title
    doc.setFontSize(18);
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate}`, 14, 30);

    // Define table columns and rows based on report type
    let columns = [];
    let rows = [];

    if (type === 'products') {
      columns = [
        'Name',
        'Price',
        'Category',
        'Promotion',
        'Description',
      ];
      rows = data.map((item) => [
        item.name,
        `$${item.price.toFixed(2)}`,
        item.category,
        item.promotionId ? `${item.promotionId.offer} (${item.promotionId.discount}%)` : 'None',
        item.description.substring(0, 50) + (item.description.length > 50 ? '...' : ''),
      ]);
    } else if (type === 'promotions') {
      columns = [
        'Offer',
        'Discount',
        'Min Order',
        'Applies To',
        'Expires',
        'Status',
      ];
      rows = data.map((item) => [
        item.offer,
        `${item.discount}%`,
        `${item.minOrder} gallons`,
        item.appliesTo,
        new Date(item.expires).toLocaleDateString(),
        item.isActive ? 'Active' : 'Inactive',
      ]);
    } else if (type === 'inquiries') {
      columns = [
        'Name',
        'Email',
        'Message',
        'Total',
        'Date',
        'Cart Items',
      ];
      rows = data.map((item) => [
        item.name,
        item.email,
        item.message || 'N/A',
        `$${item.totalAmount.toFixed(2)}`,
        new Date(item.createdAt).toLocaleDateString(),
        item.cartItems
          .map((cart) => `${cart.name} x${cart.quantity} ($${cart.total.toFixed(2)})`)
          .join('; '),
      ]);
    }

    // Generate table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Save PDF
    doc.save(`${type}_report_${currentDate.replace(/\//g, '-')}.pdf`);
    setStatus(`Downloaded ${type} report.`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {status && (
        <p
          className={`mb-4 text-center text-lg font-medium ${
            status.includes('Failed') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {status}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Products</h3>
          <p className="text-2xl">{stats.products}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Active Promotions</h3>
          <p className="text-2xl">{stats.promotions}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Inquiries</h3>
          <p className="text-2xl">{stats.inquiries}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Generate Reports</h3>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => fetchReport('products')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Product Report
          </button>
          <button
            onClick={() => fetchReport('promotions')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Promotion Report
          </button>
          <button
            onClick={() => fetchReport('inquiries')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Inquiry Report
          </button>
        </div>
        {reportData.type && (
          <div>
            <h4 className="text-md font-medium mb-2">
              {reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)} Report Preview
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    {reportData.type === 'products' && (
                      <>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Promotion</th>
                        <th className="p-2 text-left">Description</th>
                      </>
                    )}
                    {reportData.type === 'promotions' && (
                      <>
                        <th className="p-2 text-left">Offer</th>
                        <th className="p-2 text-left">Discount</th>
                        <th className="p-2 text-left">Min Order</th>
                        <th className="p-2 text-left">Applies To</th>
                        <th className="p-2 text-left">Expires</th>
                        <th className="p-2 text-left">Status</th>
                      </>
                    )}
                    {reportData.type === 'inquiries' && (
                      <>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Message</th>
                        <th className="p-2 text-left">Total</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Cart Items</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.map((item, index) => (
                    <tr key={index} className="border-b">
                      {reportData.type === 'products' && (
                        <>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">${item.price.toFixed(2)}</td>
                          <td className="p-2">{item.category}</td>
                          <td className="p-2">
                            {item.promotionId ? `${item.promotionId.offer} (${item.promotionId.discount}%)` : 'None'}
                          </td>
                          <td className="p-2">{item.description.substring(0, 50) + (item.description.length > 50 ? '...' : '')}</td>
                        </>
                      )}
                      {reportData.type === 'promotions' && (
                        <>
                          <td className="p-2">{item.offer}</td>
                          <td className="p-2">{item.discount}%</td>
                          <td className="p-2">{item.minOrder} gallons</td>
                          <td className="p-2">{item.appliesTo}</td>
                          <td className="p-2">{new Date(item.expires).toLocaleDateString()}</td>
                          <td className="p-2">{item.isActive ? 'Active' : 'Inactive'}</td>
                        </>
                      )}
                      {reportData.type === 'inquiries' && (
                        <>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.email}</td>
                          <td className="p-2">{item.message || 'N/A'}</td>
                          <td className="p-2">${item.totalAmount.toFixed(2)}</td>
                          <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                          <td className="p-2">
                            {item.cartItems.map((cart, i) => (
                              <p key={i}>
                                {cart.name} x{cart.quantity} (${cart.total.toFixed(2)})
                              </p>
                            ))}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={downloadPDF}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;