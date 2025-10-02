import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Clock, Trophy, BookOpen, User, Target, TrendingUp, Award, Zap } from 'lucide-react';

const ParticipantDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const upcomingExams = [
    { id: 1, title: 'Mathematics Olympiad', date: '2024-06-15', time: '10:00 AM' },
    { id: 2, title: 'Physics Challenge', date: '2024-06-22', time: '09:00 AM' },
  ];

  const recentResults = [
    { id: 1, exam: 'Computer Science Preliminary', score: 85, rank: 12 },
    { id: 2, exam: 'Logic and Problem Solving', score: 92, rank: 5 },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || 'Participant'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Exams Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#8</div>
          </CardContent>
        </Card>
      </div>
      
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
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exam.date}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{exam.time}</span>
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/exams/${exam.id}`)}>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming exams scheduled.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Results */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          {recentResults.length > 0 ? (
            <div className="space-y-4">
              {recentResults.map(result => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{result.exam}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>Score: {result.score}%</span>
                      <Award className="h-4 w-4 ml-3 mr-1" />
                      <span>Rank: #{result.rank}</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/results/${result.id}`)}>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent exam results.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/exams')}
        >
          <BookOpen className="h-5 w-5" />
          Browse All Exams
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/profile')}
          variant="outline"
        >
          <User className="h-5 w-5" />
          View Profile
        </Button>
        
        <Button 
          className="flex items-center justify-center gap-2 h-12" 
          onClick={() => navigate('/leaderboard')}
          variant="outline"
        >
          <Zap className="h-5 w-5" />
          Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default ParticipantDashboard;