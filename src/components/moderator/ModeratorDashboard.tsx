import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Eye, FileText, Trophy, BarChart3, Users, Clock, Calendar } from 'lucide-react';

const ModeratorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const liveExams = [
    { id: 1, title: 'Mathematics Olympiad', participants: 120, status: 'In Progress', startTime: '10:00 AM' },
    { id: 2, title: 'Physics Challenge', participants: 85, status: 'Starting Soon', startTime: '11:30 AM' },
  ];

  const recentActivity = [
    { id: 1, type: 'Question Review', item: 'Advanced Calculus Set', date: '2024-06-10', status: 'Completed' },
    { id: 2, type: 'Result Published', item: 'Computer Science Preliminary', date: '2024-06-08', status: 'Published' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Moderator'}</p>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Exams</CardTitle>
              <Eye className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">2</div>
              <p className="text-xs text-blue-600 mt-1">Monitoring live</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Question Sets</CardTitle>
              <FileText className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">15</div>
              <p className="text-xs text-green-600 mt-1">Ready to use</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Results Pending</CardTitle>
              <Trophy className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">3</div>
              <p className="text-xs text-orange-600 mt-1">Needs grading</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Participants</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">205</div>
              <p className="text-xs text-purple-600 mt-1">Online now</p>
            </CardContent>
          </Card>
        </div>
      
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="text-xl font-bold text-gray-900">Live Exams</CardTitle>
          </CardHeader>
        <CardContent>
          {liveExams.length > 0 ? (
            <div className="space-y-4">
              {liveExams.map(exam => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{exam.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{exam.participants} participants</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{exam.startTime}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                      exam.status === 'In Progress' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                  <Button onClick={() => navigate(`/moderator/live-exams/${exam.id}`)}>
                    Monitor
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No live exams at the moment.</p>
          )}
        </CardContent>
      </Card>
      
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{activity.type}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>{activity.item}</span>
                      <Calendar className="h-4 w-4 ml-3 mr-1" />
                      <span>{activity.date}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                      activity.status === 'Completed' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/moderator/activity/${activity.id}`)}>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent activity.</p>
          )}
        </CardContent>
      </Card>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => navigate('/moderator/live-exams')}
          >
            <Eye className="h-5 w-5" />
            Monitor Live Exams
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => navigate('/moderator/questions')}
            variant="outline"
          >
            <FileText className="h-5 w-5" />
            Manage Questions
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            onClick={() => navigate('/moderator/analysis')}
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

export default ModeratorDashboard;