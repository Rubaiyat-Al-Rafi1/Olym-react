import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Home,
  User,
  Trophy,
  BookOpen,
  Users,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Eye,
  UserCheck,
  MessageSquare,
  Award,
  Bell,
  Search,
  Menu,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    const baseItems = [{ path: '/dashboard', label: 'Dashboard', icon: Home }];

    switch (user?.role) {
      case 'participant':
        return [
          ...baseItems,
          { path: '/profile', label: 'Profile', icon: User },
          { path: '/results', label: 'Results', icon: Trophy },
          { path: '/exams', label: 'Exams', icon: BookOpen },
          { path: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
        ];
      case 'admin':
        return [
          ...baseItems,
          { path: '/admin/users', label: 'Manage Users', icon: Users },
          { path: '/admin/exams', label: 'Manage Exams', icon: BookOpen },
          { path: '/admin/registrations', label: 'Review Registrations', icon: UserCheck },
          { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { path: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'moderator':
        return [
          ...baseItems,
          { path: '/moderator/live-exams', label: 'Live Exams', icon: Eye },
          { path: '/moderator/questions', label: 'Questions', icon: FileText },
          { path: '/moderator/results', label: 'Results', icon: Trophy },
          { path: '/moderator/analysis', label: 'Analysis', icon: BarChart3 },
        ];
      case 'ambassador':
        return [
          ...baseItems,
          { path: '/ambassador/referrals', label: 'Referrals', icon: Users },
          { path: '/ambassador/events', label: 'Events', icon: MessageSquare },
          { path: '/ambassador/rewards', label: 'Rewards', icon: Award },
          { path: '/ambassador/analytics', label: 'Analytics', icon: BarChart3 },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-white shadow-lg w-72 md:relative md:translate-x-0`}
      >
        <button
          className="absolute top-4 left-4 text-gray-700 hover:text-green-600 transition-colors md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-expanded={sidebarOpen}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Sidebar content */}
        <div className="p-8 border-b border-gray-100">
          <Link to="/" className="flex items-center justify-center mb-4 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
            </div>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-red-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 capitalize">{user?.role} Panel</span>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-2 flex items-center justify-center gap-2 text-red-500 hover:text-red-700 transition-colors py-2 px-4 rounded-lg hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-green-600 to-red-500 text-white shadow-xl transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:transform hover:scale-102 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-white/20'
                        : 'bg-gray-100 group-hover:bg-white group-hover:shadow-md'
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        location.pathname === item.path ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                      }`}
                    />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 hover:border-gray-400"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};