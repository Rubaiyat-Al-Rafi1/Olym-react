import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, BookOpen, UserCheck, BarChart3, Settings, Calendar, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pendingRegistrations = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', university: 'MIT', date: '2024-06-10' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', university: 'Stanford', date: '2024-06-11' },
  ];

  const upcomingExams = [
    { id: 1, title: 'Mathematics Olympiad', participants: 120, date: '2024-06-15', time: '10:00 AM' },
    { id: 2, title: 'Physics Challenge', participants: 85, date: '2024-06-22', time: '09:00 AM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Admin'}</p>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">1,245</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Exams</CardTitle>
              <BookOpen className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">8</div>
              <p className="text-xs text-blue-600 mt-1">3 ongoing</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Registrations</CardTitle>
              <UserCheck className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">24</div>
              <p className="text-xs text-orange-600 mt-1">Requires action</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Universities</CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">56</div>
              <p className="text-xs text-gray-500 mt-1">Participating</p>
            </CardContent>
          </Card>
        </div>
      
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="text-xl font-bold text-gray-900">Pending Registrations</CardTitle>
          </CardHeader>
        <CardContent>
          {pendingRegistrations.length > 0 ? (
            <div className="space-y-4">
              {pendingRegistrations.map(registration => (
                <div key={registration.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{registration.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{registration.email}</span>
                      <span className="mx-2">•</span>
                      <span>{registration.university}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Applied on {registration.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => navigate(`/admin/registrations/${registration.id}`)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending registrations.</p>
          )}
        </CardContent>
      </Card>
      
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="text-xl font-bold text-gray-900">Upcoming Exams</CardTitle>
          </CardHeader>
        <CardContent>
          {upcomingExams.length > 0 ? (
            <div className="space-y-4">
              {upcomingExams.map(exam => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{exam.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{exam.participants} participants</span>
                      <Calendar className="h-4 w-4 ml-3 mr-1" />
                      <span>{exam.date}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{exam.time}</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/admin/exams/${exam.id}`)}>
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming exams.</p>
          )}
        </CardContent>
      </Card>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="h-5 w-5" />
            Manage Users
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => navigate('/admin/exams')}
            variant="outline"
          >
            <BookOpen className="h-5 w-5" />
            Manage Exams
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-gray-600 text-gray-600 hover:bg-gray-50"
            onClick={() => navigate('/admin/analytics')}
            variant="outline"
          >
            <BarChart3 className="h-5 w-5" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;