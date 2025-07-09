import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Promotions from './pages/Promotions';
import Inquiries from './pages/Inquiries';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <BrowserRouter>
      <CartProvider>
        {admin && <Navbar setAdmin={setAdmin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login setAdmin={setAdmin} />} />
          <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Login setAdmin={setAdmin} />} />
          <Route path="/admin/products" element={admin ? <Products /> : <Login setAdmin={setAdmin} />} />
          <Route path="/admin/promotions" element={admin ? <Promotions /> : <Login setAdmin={setAdmin} />} />
          <Route path="/admin/inquiries" element={admin ? <Inquiries /> : <Login setAdmin={setAdmin} />} />          <Route path="*" element={<Login setAdmin={setAdmin} />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;