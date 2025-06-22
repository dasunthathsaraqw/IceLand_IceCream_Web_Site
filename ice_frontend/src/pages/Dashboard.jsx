import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Explicit import
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, promotions: 0, inquiries: 0 });
  const [reportData, setReportData] = useState({ type: '', data: [] });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        const [productsRes, promotionsRes, inquiriesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products`),
          axios.get(`http://localhost:5000/api/promotions`),
          axios.get(`http://localhost:5000/api/inquiries`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const products = Array.isArray(productsRes.data) ? productsRes.data : [];
        const promotions = Array.isArray(promotionsRes.data) ? promotionsRes.data : [];
        const inquiries = Array.isArray(inquiriesRes.data) ? inquiriesRes.data : [];
        setStats({
          products: products.length,
          promotions: promotions.filter((p) => p.isActive === true).length,
          inquiries: inquiries.length,
        });
        // Load product report by default
        fetchReport('products');
      } catch (err) {
        console.error('Error fetching stats:', err);
        if (err.response?.status === 401) {
          navigate('/admin/login');
        } else {
          setStatus('Failed to fetch stats.');
        }
      }
    };
    fetchStats();
  }, [navigate]);

  const fetchReport = async (type) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/reports/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setReportData({ type, data });
      setStatus(`Loaded ${type} report.`);
    } catch (err) {
      console.error(`Error fetching ${type} report:`, err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      } else {
        setStatus(`Failed to load ${type} report.`);
      }
    }
  };

  const downloadPDF = () => {
    const { type, data } = reportData;
    if (!type || !Array.isArray(data) || data.length === 0) {
      setStatus('No report data to download.');
      return;
    }

    try {
      const doc = new jsPDF();
      // Apply autoTable plugin explicitly
      autoTable(doc, {});

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-'); // e.g., 06-23-2025

      console.log('Generating PDF for:', type, 'Data:', data); // Debug log

      doc.setFontSize(18);
      doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 14, 20);
      doc.setFontSize(12);
      doc.text(`Generated on: ${currentDate}`, 14, 30);

      let columns = [];
      let rows = [];

      if (type === 'products') {
        columns = ['Name', 'Price', 'Category', 'Promotion', 'Description'];
        rows = data.map((item) => [
          item.name || 'N/A',
          typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'N/A',
          item.category || 'N/A',
          item.promotionId && item.promotionId.offer && item.promotionId.discount
            ? `${item.promotionId.offer} (${item.promotionId.discount}%)`
            : 'None',
          item.description
            ? item.description.substring(0, 50) + (item.description.length > 50 ? '...' : '')
            : 'N/A',
        ]);
      } else if (type === 'promotions') {
        columns = ['Offer', 'Discount', 'Min Order', 'Applies To', 'Expires', 'Status'];
        rows = data.map((item) => [
          item.offer || 'N/A',
          typeof item.discount === 'number' ? `${item.discount}%` : 'N/A',
          typeof item.minOrder === 'number' ? `${item.minOrder} gallons` : 'N/A',
          item.appliesTo || 'N/A',
          item.expires ? new Date(item.expires).toLocaleDateString('en-US') : 'N/A',
          item.isActive === true ? 'Active' : 'Inactive',
        ]);
      } else if (type === 'inquiries') {
        columns = ['Name', 'Email', 'Message', 'Total', 'Date', 'Cart Items'];
        rows = data.map((item) => [
          item.name || 'N/A',
          item.email || 'N/A',
          item.message || 'N/A',
          typeof item.totalAmount === 'number' ? `$${item.totalAmount.toFixed(2)}` : 'N/A',
          item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US') : 'N/A',
          Array.isArray(item.cartItems) && item.cartItems.length > 0
            ? item.cartItems
                .map(
                  (cart) =>
                    `${cart.name || 'N/A'} x${cart.quantity || 0} (${
                      typeof cart.total === 'number' ? cart.total.toFixed(2) : '0.00'
                    })`
                )
                .join('; ')
            : 'N/A',
        ]);
      }

      // Generate table
      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 40,
        styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [22, 160, 133] },
        columnStyles: { 0: { cellWidth: 'auto' } },
      });

      doc.save(`${type}_report_${currentDate}.pdf`);
      setStatus(`Downloaded ${type} report.`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setStatus(`Failed to generate PDF: ${err.message}`);
    }
  };

  const getChartData = () => {
    const { type, data } = reportData;
    if (!type || !Array.isArray(data) || data.length === 0) return null;

    try {
      if (type === 'products') {
        const categories = [...new Set(data.map((item) => item.category || 'Unknown'))];
        const pricesByCategory = categories.map((category) =>
          data
            .filter((item) => (item.category || 'Unknown') === category)
            .reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)
        );
        const productCountByCategory = categories.map(
          (category) => data.filter((item) => (item.category || 'Unknown') === category).length
        );

        return {
          bar: {
            labels: categories,
            datasets: [
              {
                label: 'Total Price by Category ($)',
                data: pricesByCategory,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          pie: {
            labels: categories,
            datasets: [
              {
                label: 'Products by Category',
                data: productCountByCategory,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        };
      } else if (type === 'promotions') {
        const activeCount = data.filter((item) => item.isActive === true).length;
        const inactiveCount = data.length - activeCount;

        return {
          bar: {
            labels: data.map((item) => item.offer || 'Unknown'),
            datasets: [
              {
                label: 'Discount (%)',
                data: data.map((item) => (typeof item.discount === 'number' ? item.discount : 0)),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          pie: {
            labels: ['Active', 'Inactive'],
            datasets: [
              {
                label: 'Promotion Status',
                data: [activeCount, inactiveCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
        };
      } else if (type === 'inquiries') {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        const recentCount = data.filter((item) => item.createdAt && new Date(item.createdAt) >= last30Days).length;
        const olderCount = data.length - recentCount;

        return {
          bar: {
            labels: data.map((item) => item.name || 'Unknown'),
            datasets: [
              {
                label: 'Total Amount ($)',
                data: data.map((item) => (typeof item.totalAmount === 'number' ? item.totalAmount : 0)),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
            ],
          },
          pie: {
            labels: ['Last 30 Days', 'Older'],
            datasets: [
              {
                label: 'Inquiries by Date',
                data: [recentCount, olderCount],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
              },
            ],
          },
        };
      }
      return null;
    } catch (err) {
      console.error('Error generating chart data:', err);
      return null;
    }
  };

  const chartData = getChartData();

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
              {reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)} Report
            </h4>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {chartData ? (
                <>
                  <div>
                    <h5 className="text-sm font-medium mb-2">
                      {reportData.type === 'products'
                        ? 'Total Price by Category'
                        : reportData.type === 'promotions'
                        ? 'Discount by Promotion'
                        : 'Total Amount by Inquiry'}
                    </h5>
                    <div className="h-64">
                      <Bar
                        data={chartData.bar}
                        options={{
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text:
                                  reportData.type === 'products'
                                    ? 'Price ($)'
                                    : reportData.type === 'promotions'
                                    ? 'Discount (%)'
                                    : 'Total Amount ($)',
                              },
                            },
                            x: {
                              title: {
                                display: true,
                                text:
                                  reportData.type === 'products'
                                    ? 'Category'
                                    : reportData.type === 'promotions'
                                    ? 'Offer'
                                    : 'Customer',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">
                      {reportData.type === 'products'
                        ? 'Product Distribution by Category'
                        : reportData.type === 'promotions'
                        ? 'Promotion Status'
                        : 'Inquiries by Date'}
                    </h5>
                    <div className="h-64">
                      <Pie
                        data={chartData.pie}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-red-600">Unable to load charts.</p>
              )}
            </div>

            {/* Table Preview */}
            <h5 className="text-sm font-medium mb-2">Data Preview</h5>
            <div className="overflow-x-auto mb-6">
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
                  {Array.isArray(reportData.data) &&
                    reportData.data.map((item, index) => (
                      <tr key={`${item._id || index}`} className="border-b">
                        {reportData.type === 'products' && (
                          <>
                            <td className="p-2">{item.name || 'N/A'}</td>
                            <td className="p-2">
                              {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'N/A'}
                            </td>
                            <td className="p-2">{item.category || 'N/A'}</td>
                            <td className="p-2">
                              {item.promotionId && item.promotionId.offer && item.promotionId.discount
                                ? `${item.promotionId.offer} (${item.promotionId.discount}%)`
                                : 'None'}
                            </td>
                            <td className="p-2">
                              {item.description
                                ? item.description.substring(0, 50) + (item.description.length > 50 ? '...' : '')
                                : 'N/A'}
                            </td>
                          </>
                        )}
                        {reportData.type === 'promotions' && (
                          <>
                            <td className="p-2">{item.offer || 'N/A'}</td>
                            <td className="p-2">
                              {typeof item.discount === 'number' ? `${item.discount}%` : 'N/A'}
                            </td>
                            <td className="p-2">
                              {typeof item.minOrder === 'number' ? `${item.minOrder} gallons` : 'N/A'}
                            </td>
                            <td className="p-2">{item.appliesTo || 'N/A'}</td>
                            <td className="p-2">
                              {item.expires ? new Date(item.expires).toLocaleDateString('en-US') : 'N/A'}
                            </td>
                            <td className="p-2">{item.isActive === true ? 'Active' : 'Inactive'}</td>
                          </>
                        )}
                        {reportData.type === 'inquiries' && (
                          <>
                            <td className="p-2">{item.name || 'N/A'}</td>
                            <td className="p-2">{item.email || 'N/A'}</td>
                            <td className="p-2">{item.message || 'N/A'}</td>
                            <td className="p-2">
                              {typeof item.totalAmount === 'number' ? `$${item.totalAmount.toFixed(2)}` : 'N/A'}
                            </td>
                            <td className="p-2">
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US') : 'N/A'}
                            </td>
                            <td className="p-2">
                              {Array.isArray(item.cartItems) && item.cartItems.length > 0
                                ? item.cartItems
                                    .map(
                                      (cart) =>
                                        `${cart.name || 'N/A'} x${cart.quantity || 0} (${
                                          typeof cart.total === 'number' ? cart.total.toFixed(2) : '0.00'
                                        })`
                                    )
                                    .join('; ')
                                : 'N/A'}
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
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
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