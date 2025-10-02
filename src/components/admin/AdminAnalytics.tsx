import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, Users, BookOpen, Trophy, Download, Calendar, Filter } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const overallStats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up', icon: Users },
    { label: 'Total Exams', value: '45', change: '+8%', trend: 'up', icon: BookOpen },
    { label: 'Completed Exams', value: '38', change: '+15%', trend: 'up', icon: Trophy },
    { label: 'Active Users', value: '892', change: '+5%', trend: 'up', icon: TrendingUp }
  ];

  const examStats = [
    { exam: 'Cybersecurity Challenge', participants: 156, completion: 89, avgScore: 78 },
    { exam: 'AI & ML Contest', participants: 89, completion: 76, avgScore: 82 },
    { exam: 'Web Development Sprint', participants: 67, completion: 94, avgScore: 85 },
    { exam: 'Database Design', participants: 45, completion: 87, avgScore: 79 }
  ];

  const userGrowth = [
    { month: 'Jan', users: 120, exams: 5 },
    { month: 'Feb', users: 280, exams: 8 },
    { month: 'Mar', users: 450, exams: 12 },
    { month: 'Apr', users: 680, exams: 18 },
    { month: 'May', users: 920, exams: 25 },
    { month: 'Jun', users: 1234, exams: 32 }
  ];

  const topPerformers = [
    { name: 'Alex Johnson', university: 'MIT', score: 94.2, exams: 12 },
    { name: 'Sarah Chen', university: 'Stanford', score: 92.8, exams: 11 },
    { name: 'Michael Rodriguez', university: 'Berkeley', score: 91.5, exams: 10 },
    { name: 'Emily Davis', university: 'Harvard', score: 89.7, exams: 11 },
    { name: 'David Kim', university: 'CMU', score: 88.9, exams: 9 }
  ];

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Analytics Dashboard</h1>
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
          <Button className="bg-[#7886c7] hover:bg-[#666a93]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-[#7886c7]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">User growth chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examStats.map((exam, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{exam.exam}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Participants</p>
                      <p className="font-semibold">{exam.participants}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completion</p>
                      <p className="font-semibold">{exam.completion}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Score</p>
                      <p className="font-semibold">{exam.avgScore}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7886c7] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.university}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{performer.score}%</p>
                    <p className="text-xs text-gray-600">{performer.exams} exams</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Registration Trends</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">This Week</p>
                    <p className="font-semibold text-green-600">+45 users</p>
                  </div>
                  <div>
                    <p className="text-gray-600">This Month</p>
                    <p className="font-semibold text-blue-600">+234 users</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Exam Activity</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Active Exams</p>
                    <p className="font-semibold text-green-600">3</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Upcoming</p>
                    <p className="font-semibold text-blue-600">5</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">System Health</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Uptime</p>
                    <p className="font-semibold text-green-600">99.9%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Response Time</p>
                    <p className="font-semibold text-blue-600">120ms</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Exam Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Exam</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Participants</th>
                  <th className="text-left py-3 px-4">Completion Rate</th>
                  <th className="text-left py-3 px-4">Average Score</th>
                  <th className="text-left py-3 px-4">Highest Score</th>
                </tr>
              </thead>
              <tbody>
                {examStats.map((exam, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{exam.exam}</td>
                    <td className="py-3 px-4">2025-02-{20 + index}</td>
                    <td className="py-3 px-4">{exam.participants}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-semibold">{exam.completion}%</span>
                    </td>
                    <td className="py-3 px-4">{exam.avgScore}%</td>
                    <td className="py-3 px-4">
                      <span className="text-blue-600 font-semibold">{exam.avgScore + 15}%</span>
                    </td>
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