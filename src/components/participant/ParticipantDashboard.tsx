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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Participant'}!</h1>
            <p className="text-gray-600 mt-1">Track your progress and upcoming exams</p>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Exams Completed</CardTitle>
              <BookOpen className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">4</div>
              <p className="text-xs text-blue-600 mt-1">↑ +2 this month</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
              <Target className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">87%</div>
              <p className="text-xs text-green-600 mt-1">Excellent performance!</p>
            </CardContent>
          </Card>
        
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Rank</CardTitle>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">#8</div>
              <p className="text-xs text-yellow-600 mt-1">↑ +3 positions</p>
            </CardContent>
          </Card>
        </div>
      
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
      
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-xl font-bold text-gray-900">Recent Results</CardTitle>
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
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => navigate('/exams')}
          >
            <BookOpen className="h-5 w-5" />
            Browse All Exams
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => navigate('/profile')}
            variant="outline"
          >
            <User className="h-5 w-5" />
            View Profile
          </Button>
        
          <Button
            className="flex items-center justify-center gap-2 h-14 text-base border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            onClick={() => navigate('/leaderboard')}
            variant="outline"
          >
            <Zap className="h-5 w-5" />
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;