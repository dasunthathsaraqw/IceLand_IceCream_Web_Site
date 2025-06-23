import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  BarChart3,
  Package,
  Megaphone,
  Mail,
  Download,
  RefreshCw,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
  Eye,
  Filter,
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, promotions: 0, inquiries: 0 });
  const [reportData, setReportData] = useState({ type: '', data: [] });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        setLoading(true);
        const [productsRes, promotionsRes, inquiriesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/promotions', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/inquiries', {
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
        fetchReport('products');
      } catch (err) {
        console.error('Error fetching stats:', err);
        setLoading(false);
        if (err.response?.status === 401) {
          navigate('/admin/login');
        } else {
          setStatus('Failed to fetch stats.');
        }
      }
    };
    fetchStats();
  }, [navigate]);

  const fetchReport = useCallback(
    async (type) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        setLoading(true);
        setActiveTab(type);
        const res = await axios.get(`http://localhost:5000/api/reports/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : [];
        setReportData({ type, data });
        setStatus(`Loaded ${type} report successfully`);
      } catch (err) {
        console.error(`Error fetching ${type} report:`, err);
        if (err.response?.status === 401) {
          navigate('/admin/login');
        } else {
          setStatus(`Failed to load ${type} report.`);
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const downloadPDF = () => {
    const { type, data } = reportData;
    if (!type || !Array.isArray(data) || data.length === 0) {
      setStatus('No report data to download.');
      return;
    }

    try {
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-');

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
          item.promotionId && item.promotionId.offer && typeof item.promotionId.discount === 'number'
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
          item.message ? item.message.substring(0, 50) + (item.message.length > 50 ? '...' : '') : 'N/A',
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

      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 40,
        styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [99, 102, 241] },
        columnStyles: { 0: { cellWidth: 'auto' } },
      });

      doc.save(`${type}_report_${currentDate}.pdf`);
      setStatus(`Downloaded ${type} report successfully`);
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
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
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
                  'rgba(239, 68, 68, 0.8)',
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(251, 191, 36, 0.8)',
                  'rgba(168, 85, 247, 0.8)',
                  'rgba(14, 165, 233, 0.8)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 3,
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
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          },
          pie: {
            labels: ['Active', 'Inactive'],
            datasets: [
              {
                label: 'Promotion Status',
                data: [activeCount, inactiveCount],
                backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 3,
              },
            ],
          },
        };
      } else if (type === 'inquiries') {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        const recentCount = data.filter(
          (item) => item.createdAt && new Date(item.createdAt) >= last30Days
        ).length;
        const olderCount = data.length - recentCount;

        return {
          bar: {
            labels: data.map((item) => item.name || 'Unknown'),
            datasets: [
              {
                label: 'Total Amount ($)',
                data: data.map((item) => (typeof item.totalAmount === 'number' ? item.totalAmount : 0)),
                backgroundColor: 'rgba(168, 85, 247, 0.8)',
                borderColor: 'rgba(168, 85, 247, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          },
          pie: {
            labels: ['Last 30 Days', 'Older'],
            datasets: [
              {
                label: 'Inquiries by Date',
                data: [recentCount, olderCount],
                backgroundColor: ['rgba(14, 165, 233, 0.8)', 'rgba(251, 191, 36, 0.8)'],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 3,
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

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{trend}%
            </div>
          )}
        </div>
        <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600 border border-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor your business performance and generate detailed reports</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-900">Just now</p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
              status.includes('Failed') || status.includes('Error')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">{status}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={Package}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            trend={12}
          />
          <StatCard
            title="Active Promotions"
            value={stats.promotions}
            icon={Megaphone}
            color="bg-gradient-to-r from-green-500 to-green-600"
            trend={8}
          />
          <StatCard
            title="Customer Inquiries"
            value={stats.inquiries}
            icon={Mail}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            trend={24}
          />
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-7 h-7 mr-3" />
              Analytics & Reports
            </h2>
            <p className="text-indigo-100 mt-2">Generate comprehensive reports and visualize your data</p>
          </div>

          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-6">
              <TabButton
                id="products"
                label="Product Report"
                icon={Package}
                isActive={activeTab === 'products'}
                onClick={fetchReport}
              />
              <TabButton
                id="promotions"
                label="Promotion Report"
                icon={Megaphone}
                isActive={activeTab === 'promotions'}
                onClick={fetchReport}
              />
              <TabButton
                id="inquiries"
                label="Inquiry Report"
                icon={Mail}
                isActive={activeTab === 'inquiries'}
                onClick={fetchReport}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3 text-indigo-600">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-lg font-medium">Loading report...</span>
                </div>
              </div>
            ) : reportData.type ? (
              <div className="space-y-8">
                {/* Charts */}
                {chartData ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
                        {reportData.type === 'products'
                          ? 'Value Distribution'
                          : reportData.type === 'promotions'
                          ? 'Discount Distribution'
                          : 'Inquiry Value'}
                      </h3>
                      <div className="h-64">
                        <Bar
                          data={chartData.bar}
                          options={{
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                borderColor: 'rgba(99, 102, 241, 1)',
                                borderWidth: 1,
                                cornerRadius: 8,
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                grid: { display: false },
                                border: { display: false },
                                ticks: { color: '#6B7280' },
                                title: {
                                  display: true,
                                  text:
                                    reportData.type === 'products'
                                      ? 'Price ($)'
                                      : reportData.type === 'promotions'
                                      ? 'Discount (%)'
                                      : 'Total Amount ($)',
                                  color: '#6B7280',
                                },
                              },
                              x: {
                                grid: { display: false },
                                border: { display: false },
                                ticks: { color: '#6B7280' },
                                title: {
                                  display: true,
                                  text:
                                    reportData.type === 'products'
                                      ? 'Category'
                                      : reportData.type === 'promotions'
                                      ? 'Offer'
                                      : 'Customer',
                                  color: '#6B7280',
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                        Distribution Overview
                      </h3>
                      <div className="h-64">
                        <Pie
                          data={chartData.pie}
                          options={{
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: {
                                  padding: 20,
                                  usePointStyle: true,
                                  color: '#374151',
                                },
                              },
                              tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                borderColor: 'rgba(99, 102, 241, 1)',
                                borderWidth: 1,
                                cornerRadius: 8,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 text-center">Unable to load charts.</p>
                )}

                {/* Data Table */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                 ℃<div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                      Data Preview
                    </h3>
                    <div className="flex items-center space-x-3">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-500">{reportData.data?.length || 0} records</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          {reportData.type === 'products' && (
                            <>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Promotion</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                            </>
                          )}
                          {reportData.type === 'promotions' && (
                            <>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Offer</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Discount</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Min Order</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Applies To</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expires</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                            </>
                          )}
                          {reportData.type === 'inquiries' && (
                            <>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Message</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                Cart Items
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(reportData.data) &&
                          reportData.data.map((item, index) => (
                            <tr
                              key={item._id || `row-${index}`}
                              className="hover:bg-gray-50 transition-colors duration-200"
                            >
                              {reportData.type === 'products' && (
                                <>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {item.name || 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {item.category || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                      {item.promotionId &&
                                      item.promotionId.offer &&
                                      typeof item.promotionId.discount === 'number'
                                        ? `${item.promotionId.offer} (${item.promotionId.discount}%)`
                                        : 'None'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                    {item.description
                                      ? item.description.substring(0, 50) +
                                        (item.description.length > 50 ? '...' : '')
                                      : 'N/A'}
                                  </td>
                                </>
                              )}
                              {reportData.type === 'promotions' && (
                                <>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {item.offer || 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                      {typeof item.discount === 'number' ? `${item.discount}%` : 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    {typeof item.minOrder === 'number' ? `${item.minOrder} gallons` : 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">{item.appliesTo || 'N/A'}</td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center text-xs text-gray-500">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {item.expires ? new Date(item.expires).toLocaleDateString('en-US') : 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}
                                    >
                                      {item.isActive === true ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>
                                </>
                              )}
                              {reportData.type === 'inquiries' && (
                                <>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {item.name || 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">{item.email || 'N/A'}</td>
                                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                    {item.message
                                      ? item.message.substring(0, 60) + (item.message.length > 60 ? '...' : '')
                                      : 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <DollarSign className="w-3 h-3 mr-1" />
                                      {typeof item.totalAmount === 'number'
                                        ? `$${item.totalAmount.toFixed(2)}`
                                        : 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center text-xs text-gray-500">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {item.createdAt
                                        ? new Date(item.createdAt).toLocaleDateString('en-US')
                                        : 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
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
                </div>

                {/* Download Button */}
                <div className="flex justify-center">
                  <button
                    onClick={downloadPDF}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Download PDF Report
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">Select a report to view data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;