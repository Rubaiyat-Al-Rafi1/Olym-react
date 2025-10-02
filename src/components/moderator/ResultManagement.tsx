import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Trophy, Eye, Download, Send, Filter, Search, CheckCircle, Clock } from 'lucide-react';

export const ResultManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const examResults = [
    {
      id: '1',
      examTitle: 'Cybersecurity Challenge',
      examDate: '2025-02-28',
      totalParticipants: 67,
      resultsProcessed: 67,
      averageScore: 78.5,
      highestScore: 95,
      lowestScore: 45,
      status: 'pending',
      completedAt: '2025-02-28T14:30:00Z'
    },
    {
      id: '2',
      examTitle: 'Database Design Contest',
      examDate: '2025-02-25',
      totalParticipants: 45,
      resultsProcessed: 45,
      averageScore: 82.3,
      highestScore: 98,
      lowestScore: 52,
      status: 'published',
      completedAt: '2025-02-25T16:00:00Z',
      publishedAt: '2025-02-26T10:00:00Z'
    },
    {
      id: '3',
      examTitle: 'Web Development Sprint',
      examDate: '2025-02-20',
      totalParticipants: 89,
      resultsProcessed: 89,
      averageScore: 85.7,
      highestScore: 100,
      lowestScore: 38,
      status: 'published',
      completedAt: '2025-02-20T15:45:00Z',
      publishedAt: '2025-02-21T09:00:00Z'
    }
  ];

  const participantResults = [
    { id: '1', name: 'John Smith', email: 'john@university.edu', score: 95, rank: 1, timeSpent: 105 },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@college.edu', score: 92, rank: 2, timeSpent: 98 },
    { id: '3', name: 'Mike Davis', email: 'mike@institute.edu', score: 88, rank: 3, timeSpent: 110 },
    { id: '4', name: 'Emily Chen', email: 'emily@university.edu', score: 85, rank: 4, timeSpent: 102 },
    { id: '5', name: 'Alex Wilson', email: 'alex@college.edu', score: 82, rank: 5, timeSpent: 115 }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending Review', count: examResults.filter(e => e.status === 'pending').length },
    { id: 'published', label: 'Published', count: examResults.filter(e => e.status === 'published').length },
    { id: 'all', label: 'All Results', count: examResults.length }
  ];

  const filteredResults = selectedTab === 'all' 
    ? examResults 
    : examResults.filter(result => result.status === selectedTab);

  const handlePublishResults = (examId: string) => {
    console.log('Publishing results for exam:', examId);
  };

  const handleViewDetails = (examId: string) => {
    console.log('Viewing details for exam:', examId);
  };

  const handleDownloadResults = (examId: string) => {
    console.log('Downloading results for exam:', examId);
  };

  const handleSendNotifications = (examId: string) => {
    console.log('Sending notifications for exam:', examId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#666a93]">Result Management</h1>
        <Button className="bg-[#7886c7] hover:bg-[#666a93]">
          <Download className="h-4 w-4 mr-2" />
          Export All Results
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{examResults.length}</p>
              <p className="text-sm text-gray-600">Total Exams</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {examResults.filter(e => e.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {examResults.filter(e => e.status === 'published').length}
              </p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {examResults.reduce((sum, exam) => sum + exam.totalParticipants, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Participants</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              selectedTab === tab.id
                ? 'border-[#7886c7] text-[#7886c7]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={result.id} className="border-2 border-gray-200 hover:border-[#7886c7] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#666a93] mb-2">{result.examTitle}</h3>
                  <div className="flex gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status === 'pending' ? (
                        <>
                          <Clock className="h-3 w-3 inline mr-1" />
                          Pending Review
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          Published
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Exam Date: {result.examDate} | Completed: {new Date(result.completedAt).toLocaleString()}
                  </p>
                  {result.publishedAt && (
                    <p className="text-sm text-gray-600">
                      Published: {new Date(result.publishedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{result.totalParticipants}</p>
                  <p className="text-xs text-gray-600">Participants</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{result.averageScore.toFixed(1)}%</p>
                  <p className="text-xs text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-600">{result.highestScore}%</p>
                  <p className="text-xs text-gray-600">Highest Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-red-600">{result.lowestScore}%</p>
                  <p className="text-xs text-gray-600">Lowest Score</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{result.resultsProcessed}</p>
                  <p className="text-xs text-gray-600">Processed</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Results processing: {result.resultsProcessed}/{result.totalParticipants} completed
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(result.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDownloadResults(result.id)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  {result.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handlePublishResults(result.id)}>
                      <Trophy className="h-4 w-4 mr-1" />
                      Publish Results
                    </Button>
                  )}
                  {result.status === 'published' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleSendNotifications(result.id)}>
                      <Send className="h-4 w-4 mr-1" />
                      Send Notifications
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Results View */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers - Cybersecurity Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Rank</th>
                  <th className="text-left py-3 px-4">Participant</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Time Spent</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {participantResults.map((participant) => (
                  <tr key={participant.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {participant.rank <= 3 && (
                          <Trophy className={`h-4 w-4 ${
                            participant.rank === 1 ? 'text-yellow-500' :
                            participant.rank === 2 ? 'text-gray-400' :
                            'text-amber-600'
                          }`} />
                        )}
                        <span className="font-semibold">#{participant.rank}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{participant.name}</p>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-green-600">{participant.score}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{participant.timeSpent} min</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
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