import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Promotions from './pages/Promotions';
import { useState } from 'react';

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <BrowserRouter>
      {admin && <Navbar setAdmin={setAdmin} />}
      <Routes>
        <Route path="/admin/login" element={<Login setAdmin={setAdmin} />} />
        <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Login setAdmin={setAdmin} />} />
        <Route path="/admin/products" element={admin ? <Products /> : <Login setAdmin={setAdmin} />} />
        <Route path="/admin/promotions" element={admin ? <Promotions /> : <Login setAdmin={setAdmin} />} />
        <Route path="*" element={<Login setAdmin={setAdmin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;