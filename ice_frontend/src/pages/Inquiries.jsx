import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/admin/login'); // Redirect to login on unauthorized
        } else {
          setStatus('Failed to fetch inquiries. Please try again.');
          console.error('Error fetching inquiries:', err);
        }
      }
    };
    fetchInquiries();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
      setStatus('Inquiry deleted successfully.');
    } catch (err) {
      setStatus('Failed to delete inquiry. Please try again.');
      console.error('Error deleting inquiry:', err);
    }
  };

  const handleNotify = (email) => {
    window.location.href = `mailto:${email}?subject=Re: Your Ice Cream Inquiry`;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
      {status && (
        <p
          className={`mb-4 text-center text-lg font-medium ${
            status.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status}
        </p>
      )}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Inquiry List</h3>
        {inquiries.length === 0 ? (
          <p className="text-blue-700">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Message</th>
                  <th className="p-2 text-left">Cart Items</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b">
                    <td className="p-2">{inquiry.name}</td>
                    <td className="p-2">{inquiry.email}</td>
                    <td className="p-2">{inquiry.message || 'N/A'}</td>
                    <td className="p-2">
                      {inquiry.cartItems.map((item, index) => (
                        <p key={index}>
                          {item.name} x {item.quantity} (${item.total.toFixed(2)})
                        </p>
                      ))}
                    </td>
                    <td className="p-2">${inquiry.totalAmount.toFixed(2)}</td>
                    <td className="p-2">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 flex space-x-2">
                      <button
                        onClick={() => handleNotify(inquiry.email)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Notify
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inquiries;