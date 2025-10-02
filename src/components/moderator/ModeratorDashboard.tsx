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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Moderator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Question Sets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">205</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Live Exams */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Live Exams</CardTitle>
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
      
      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
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
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/moderator/live-exams')}
        >
          <Eye className="h-5 w-5" />
          Monitor Live Exams
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/moderator/questions')}
          variant="outline"
        >
          <FileText className="h-5 w-5" />
          Manage Questions
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/moderator/analysis')}
          variant="outline"
        >
          <BarChart3 className="h-5 w-5" />
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default ModeratorDashboard;