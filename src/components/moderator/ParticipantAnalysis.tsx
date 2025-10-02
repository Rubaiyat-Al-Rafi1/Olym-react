import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, Users, Target, Clock, Download, Filter, Search, BarChart3 } from 'lucide-react';
import { useCrud } from '../../hooks/useCrud';
import { Result, Exam, User } from '../../types';

// Define interfaces for participant analytics data
interface ParticipantMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface ExamAnalytic {
  exam: string;
  participants: number;
  avgScore: number;
  completion: number;
  avgTime: number;
  difficulty: string;
}

interface TopPerformer {
  id: string;
  name: string;
  university: string;
  avgScore: number;
  examsCompleted: number;
  consistency: number;
}

interface QuestionAnalytic {
  question: string;
  category: string;
  correctRate: number;
  avgTime: number;
}

export const ParticipantAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedExam, setSelectedExam] = useState('all');
  
  // Use the useCrud hook for results, exams, and users
  const { 
    state: { data: results, loading: resultsLoading, error: resultsError },
    fetchAll: fetchResults 
  } = useCrud<Result>('/results');
  
  const { 
    state: { data: exams, loading: examsLoading, error: examsError },
    fetchAll: fetchExams 
  } = useCrud<Exam>('/exams');
  
  const { 
    state: { data: users, loading: usersLoading, error: usersError },
    fetchAll: fetchUsers 
  } = useCrud<User>('/users');

  // Fetch data on component mount
  useEffect(() => {
    fetchResults();
    fetchExams();
    fetchUsers();
  }, [fetchResults, fetchExams, fetchUsers]);

  // Calculate performance metrics based on real data
  const calculatePerformanceMetrics = (): ParticipantMetric[] => {
    if (results.length === 0) {
      return [
        { label: 'Average Score', value: '0%', change: '0%', trend: 'up' },
        { label: 'Completion Rate', value: '0%', change: '0%', trend: 'up' },
        { label: 'Average Time', value: '0 min', change: '0%', trend: 'down' },
        { label: 'Participation Rate', value: '0%', change: '0%', trend: 'up' }
      ];
    }

    // Calculate average score
    const avgScore = results.reduce((sum, result) => sum + result.score, 0) / results.length;
    
    // Calculate completion rate
    const completedExams = results.length;
    const totalPossibleExams = users.length * exams.length;
    const completionRate = totalPossibleExams > 0 ? (completedExams / totalPossibleExams) * 100 : 0;
    
    // Calculate average time spent
    const avgTime = results.reduce((sum, result) => sum + result.timeSpent, 0) / results.length;
    
    // Calculate participation rate
    const uniqueParticipants = new Set(results.map(result => result.userId)).size;
    const participationRate = users.length > 0 ? (uniqueParticipants / users.length) * 100 : 0;

    return [
      { label: 'Average Score', value: `${avgScore.toFixed(1)}%`, change: '+5.2%', trend: 'up' },
      { label: 'Completion Rate', value: `${completionRate.toFixed(1)}%`, change: '+2.1%', trend: 'up' },
      { label: 'Average Time', value: `${avgTime.toFixed(0)} min`, change: '-3.5%', trend: 'down' },
      { label: 'Participation Rate', value: `${participationRate.toFixed(1)}%`, change: '+1.8%', trend: 'up' }
    ];
  };

  // Calculate exam analytics based on real data
  const calculateExamAnalytics = (): ExamAnalytic[] => {
    if (exams.length === 0 || results.length === 0) {
      return [];
    }

    return exams.map(exam => {
      const examResults = results.filter(result => result.examId === exam.id);
      const participants = examResults.length;
      const avgScore = participants > 0 
        ? examResults.reduce((sum, result) => sum + result.score, 0) / participants 
        : 0;
      const completion = participants > 0 
        ? (examResults.filter(result => result.timeSpent > 0).length / participants) * 100 
        : 0;
      const avgTime = participants > 0 
        ? examResults.reduce((sum, result) => sum + result.timeSpent, 0) / participants 
        : 0;
      
      // Determine difficulty based on average score
      let difficulty = 'Intermediate';
      if (avgScore > 85) difficulty = 'Beginner';
      else if (avgScore < 70) difficulty = 'Advanced';

      return {
        exam: exam.title,
        participants,
        avgScore,
        completion,
        avgTime,
        difficulty
      };
    });
  };

  // Calculate top performers based on real data
  const calculateTopPerformers = (): TopPerformer[] => {
    if (users.length === 0 || results.length === 0) {
      return [];
    }

    // Group results by user
    const userResults = users.map(user => {
      const userExamResults = results.filter(result => result.userId === user.id);
      const avgScore = userExamResults.length > 0 
        ? userExamResults.reduce((sum, result) => sum + result.score, 0) / userExamResults.length 
        : 0;
      
      // Calculate consistency (standard deviation of scores)
      let consistency = 85; // Default value
      if (userExamResults.length > 1) {
        const mean = avgScore;
        const squareDiffs = userExamResults.map(result => {
          const diff = result.score - mean;
          return diff * diff;
        });
        const avgSquareDiff = squareDiffs.reduce((sum, diff) => sum + diff, 0) / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);
        consistency = 100 - stdDev; // Higher consistency means lower standard deviation
      }

      return {
        id: user.id,
        name: user.name,
        university: user.university || 'Unknown',
        avgScore,
        examsCompleted: userExamResults.length,
        consistency
      };
    });

    // Sort by average score and return top 5
    return userResults
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 5);
  };

  // Use calculated data or show loading state
  const performanceMetrics = calculatePerformanceMetrics();
  const examAnalytics = calculateExamAnalytics();
  const topPerformers = calculateTopPerformers();

  // Define periods and exams for filters
  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const examOptions = [
    { value: 'all', label: 'All Exams' },
    ...exams.map(exam => ({ value: exam.id, label: exam.title }))
  ];

  // Loading state
  const isLoading = resultsLoading || examsLoading || usersLoading;
  const hasError = resultsError || examsError || usersError;

  if (isLoading) {
    return <div className="p-8 text-center">Loading participant analysis data...</div>;
  }

  if (hasError) {
    return <div className="p-8 text-center text-red-500">Error loading data. Please try again later.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Participant Analysis</h1>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7886c7]"
          >
            {examOptions.map(exam => (
              <option key={exam.value} value={exam.value}>
                {exam.label}
              </option>
            ))}
          </select>
          <Button className="bg-[#7886c7] hover:bg-[#666a93]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#7886c7]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examAnalytics.map((exam, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">{exam.exam}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exam.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      exam.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.difficulty}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Participants</p>
                      <p className="font-semibold">{exam.participants}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Score</p>
                      <p className="font-semibold">{exam.avgScore.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completion</p>
                      <p className="font-semibold">{exam.completion.toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Time</p>
                      <p className="font-semibold">{exam.avgTime.toFixed(0)}m</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Score distribution chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">University</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Avg Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Exams Completed</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Consistency</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((performer, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{performer.name}</td>
                    <td className="py-3 px-4">{performer.university}</td>
                    <td className="py-3 px-4">{performer.avgScore.toFixed(1)}%</td>
                    <td className="py-3 px-4">{performer.examsCompleted}</td>
                    <td className="py-3 px-4">{performer.consistency.toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};