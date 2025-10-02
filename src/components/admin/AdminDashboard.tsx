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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Registrations</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Universities</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Pending Registrations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Pending Registrations</CardTitle>
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
      
      {/* Upcoming Exams */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Exams</CardTitle>
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
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/admin/users')}
        >
          <Users className="h-5 w-5" />
          Manage Users
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/admin/exams')}
          variant="outline"
        >
          <BookOpen className="h-5 w-5" />
          Manage Exams
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/admin/settings')}
          variant="outline"
        >
          <Settings className="h-5 w-5" />
          System Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;