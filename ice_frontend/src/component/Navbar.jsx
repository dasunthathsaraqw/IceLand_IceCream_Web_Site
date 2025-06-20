import { Link } from 'react-router-dom';

function Navbar({ setAdmin }) {
  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Iceania Admin</div>
        <div className="space-x-4">
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/admin/products" className="hover:underline">Products</Link>
          <Link to="/admin/promotions" className="hover:underline">Promotions</Link>
          <button onClick={logout} className="hover:underline">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
