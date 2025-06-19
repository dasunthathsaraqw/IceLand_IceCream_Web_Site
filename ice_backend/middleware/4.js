import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Flavors from './pages/Flavors';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import './index.css'; // Tailwind CSS styles

// Main App component handling routing and navigation
function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar */}
      <nav className="bg-pink-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Ice Cream Shop</Link>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/flavors" className="hover:underline">Flavors</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/admin" className="hover:underline">Admin</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main content area */}
      <div className="min-h-screen bg-pink-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-pink-500 text-white p-4 text-center">
        <p>&copy; 2025 Ice Cream Shop. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;

