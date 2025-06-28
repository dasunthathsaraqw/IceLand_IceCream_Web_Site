import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ setAdmin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/promotions', label: 'Promotions' },
    { path: '/admin/inquiries', label: 'Inquiries' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="text-xl font-semibold text-gray-800">
            IceLand Ice Cream Admin Dashboard
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-4'
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-600 hover:text-red-600 
                       transition-colors duration-200 ml-4 px-3 py-1 
                       border border-gray-300 rounded hover:border-red-300"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-3 py-2 text-sm font-medium rounded transition-colors duration-200
                    ${isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm font-medium 
                         text-gray-600 hover:text-red-600 hover:bg-red-50 
                         rounded transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;