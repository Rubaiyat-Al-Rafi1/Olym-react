import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Search, Bell, User } from 'lucide-react';
import { Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Bangladesh Olympiad logo" width="40" height="40" decoding="async" className="w-10 h-10 object-contain hover:scale-105 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-red-500 bg-clip-text text-transparent">
              Bangladesh Olympiad
            </span>
          </Link>
          
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {menuOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 z-50"
                role="menu"
              >
                <div className="flex justify-end p-2">
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close menu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  </>
                )}
                <Link
                  to="/exams"
                  className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Exams
                </Link>
                <Link
                  to="/leaderboard"
                  className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                    role="menuitem"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="relative group">
                <div className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-lg transition-colors cursor-pointer">
                  <div className="relative">
                    <img src="/default-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <hr className="my-1" />
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hidden md:flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};