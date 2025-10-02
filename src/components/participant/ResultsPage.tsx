import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Trophy, Calendar, Clock, Target, Download, Eye } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  const results = [
    {
      id: '1',
      examTitle: 'Web Development Sprint',
      date: '2025-02-28',
      score: 85,
      totalScore: 100,
      rank: 12,
      totalParticipants: 150,
      timeSpent: 105,
      duration: 120,
      status: 'completed',
      category: 'Web Development',
      correctAnswers: 17,
      totalQuestions: 20
    },
    {
      id: '2',
      examTitle: 'Database Design Challenge',
      date: '2025-02-20',
      score: 92,
      totalScore: 100,
      rank: 5,
      totalParticipants: 120,
      timeSpent: 95,
      duration: 120,
      status: 'completed',
      category: 'Database',
      correctAnswers: 23,
      totalQuestions: 25
    },
    {
      id: '3',
      examTitle: 'Algorithm Challenge',
      date: '2025-02-10',
      score: 78,
      totalScore: 100,
      rank: 25,
      totalParticipants: 200,
      timeSpent: 110,
      duration: 120,
      status: 'completed',
      category: 'Algorithms',
      correctAnswers: 15,
      totalQuestions: 20
    },
    {
      id: '4',
      examTitle: 'Cybersecurity Challenge',
      date: '2025-03-15',
      score: 0,
      totalScore: 100,
      rank: 0,
      totalParticipants: 0,
      timeSpent: 0,
      duration: 120,
      status: 'upcoming',
      category: 'Cybersecurity',
      correctAnswers: 0,
      totalQuestions: 25
    }
  ];

  const completedResults = results.filter(r => r.status === 'completed');
  const upcomingExams = results.filter(r => r.status === 'upcoming');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankColor = (rank: number, total: number) => {
    const percentage = (rank / total) * 100;
    if (percentage <= 10) return 'text-yellow-600';
    if (percentage <= 25) return 'text-green-600';
    if (percentage <= 50) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Results</h1>
        <Button className="bg-[#7886c7] hover:bg-[#666a93]">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exams Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedResults.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(completedResults.reduce((acc, r) => acc + r.score, 0) / completedResults.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Rank</p>
                <p className="text-2xl font-bold text-gray-900">
                  #{Math.min(...completedResults.map(r => r.rank))}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedResults.reduce((acc, r) => acc + r.score, 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{result.examTitle}</h3>
                    <p className="text-sm text-gray-600">{result.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {result.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </span>
                </div>

                {result.status === 'completed' ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Score</p>
                      <p className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}/{result.totalScore}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Rank</p>
                      <p className={`text-xl font-bold ${getRankColor(result.rank, result.totalParticipants)}`}>
                        #{result.rank}/{result.totalParticipants}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="text-xl font-bold text-gray-900">
                        {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Time Used</p>
                      <p className="text-xl font-bold text-gray-900">
                        {result.timeSpent}/{result.duration}m
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {result.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {result.duration} minutes
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {result.status === 'completed' ? `Completed on ${result.date}` : `Scheduled for ${result.date}`}
                  </span>
                  {result.status === 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedResult(result.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Performance chart would be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};